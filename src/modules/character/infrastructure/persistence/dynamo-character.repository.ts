import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Inject } from '@nestjs/common';
import { dynamoDbClient } from 'src/modules/shared/infrastructure/persistence/dynamoDBClient';

import { Character } from '../../domain/character';
import { CharacterRepository } from '../../domain/character.repository';
import { CharacterCriteria } from '../../domain/character-criteria';
import {
  EXTERNAL_CHARACTER_PROVIDER_ALIAS,
  ExternalCharacterProvider,
} from '../../domain/external-character.provider';
import {
  DynamoCaracterEntityProps as CaracterEntity,
  DynamoCharacterEntity,
} from './dynamo-character.entity';

const CHARACTERS_TABLE_NAME = process.env.CHARACTERS_TABLE_NAME;

export class DynamoCharacterRepository implements CharacterRepository {
  constructor(
    @Inject(EXTERNAL_CHARACTER_PROVIDER_ALIAS)
    private readonly externalCharacterProvider: ExternalCharacterProvider,
  ) {}

  async createCharacter(character: Character): Promise<void> {
    const params = {
      TableName: CHARACTERS_TABLE_NAME,
      Item: DynamoCharacterEntity.FromCharacter(character),
    };

    await dynamoDbClient.send(new PutCommand(params));
  }

  async findOneCharacterBy(
    characterCriteria: CharacterCriteria,
  ): Promise<Character | null> {
    let character = null;
    if (characterCriteria.getId()) {
      character = await this.findCharacterById(characterCriteria.getId());
    } else if (characterCriteria.getExternalId()) {
      character = await this.findCharacterByExternalId(
        characterCriteria.getExternalId(),
      );
    }
    return character;
  }

  private async findCharacterById(
    characterId: string,
  ): Promise<Character | null> {
    let character = null;

    const params = {
      TableName: CHARACTERS_TABLE_NAME,
      Key: {
        id: characterId,
      },
    };
    const result = await dynamoDbClient.send(new GetCommand(params));
    const characterEntity = result.Item;

    if (characterEntity) {
      character = DynamoCharacterEntity.ToCharacter(
        characterEntity as CaracterEntity,
      );
    }
    return character;
  }

  async findCharacterByExternalId(
    externalId: string,
  ): Promise<Character | null> {
    let character = null;

    const params = {
      TableName: CHARACTERS_TABLE_NAME,
      IndexName: 'externalIdIndex',
      KeyConditionExpression: 'externalId = :externalId',
      ExpressionAttributeValues: {
        ':externalId': externalId,
      },
    };
    const result = await dynamoDbClient.send(new QueryCommand(params));
    const characterEntity = result.Items?.[0];

    if (characterEntity) {
      character = DynamoCharacterEntity.ToCharacter(
        characterEntity as CaracterEntity,
      );
    }

    if (!character) {
      character =
        await this.externalCharacterProvider.getCharacterById(externalId);
      if (character) {
        await this.createCharacter(character);
      }
    }

    return character;
  }
}
