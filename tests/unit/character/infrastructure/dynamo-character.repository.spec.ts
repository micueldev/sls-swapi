import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { CharacterCriteria } from 'src/modules/character/domain/character-criteria';
import { DynamoCharacterEntity } from 'src/modules/character/infrastructure/persistence/dynamo-character.entity';
import {
  CHARACTERS_TABLE_NAME,
  DynamoCharacterRepository,
} from 'src/modules/character/infrastructure/persistence/dynamo-character.repository';

import { MockExternalCharacterProvider } from '../__mocks__/mock-external-character.provider';
import { CharacterMother } from '../domain/mothers/character.mother';
import { CharacterExternalIdMother } from '../domain/mothers/character-external-id.mother';

describe('DynamoCharacterRepository test', () => {
  const mockDynamoClient = mockClient(DynamoDBDocumentClient);

  const mockExternalCharacterProvider = new MockExternalCharacterProvider();
  const dynamoCharacterRepository = new DynamoCharacterRepository(
    mockExternalCharacterProvider,
  );
  const mockCharacterPrimitive = {
    id: '462d7ada-b96c-4495-bf08-b327064d7e8c',
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hairColor: 'none',
    skinColor: 'white',
    eyeColor: 'yellow',
    birthYear: '41.9BBY',
    gender: 'male',
    planetId: '1',
    films: ['1', '2', '3', '6'],
    vehicles: [],
    externalId: '34',
  };

  beforeEach(() => {
    mockDynamoClient.reset();
  });

  it('should create a character', async () => {
    const mockCharacter = CharacterMother.create(mockCharacterPrimitive);
    const putCommandInput = {
      TableName: CHARACTERS_TABLE_NAME,
      Item: mockCharacterPrimitive,
    };

    const randomCharacter = CharacterMother.random();
    const putCommandInputRandom = {
      TableName: CHARACTERS_TABLE_NAME,
      Item: DynamoCharacterEntity.FromCharacter(randomCharacter),
    };

    mockDynamoClient
      .on(PutCommand)
      .rejects(new Error())
      .on(PutCommand, putCommandInput)
      .resolves({})
      .on(PutCommand, putCommandInputRandom)
      .resolves({});

    await dynamoCharacterRepository.createCharacter(mockCharacter);
    await dynamoCharacterRepository.createCharacter(randomCharacter);
  });

  it('should find an existing character', async () => {
    const character = CharacterMother.random();

    const getCommandInput = {
      TableName: CHARACTERS_TABLE_NAME,
      Key: {
        id: character.getId(),
      },
    };
    mockDynamoClient.on(GetCommand, getCommandInput).resolves({
      Item: DynamoCharacterEntity.FromCharacter(character),
    });

    const criteria = CharacterCriteria.createById(character.getId());
    const characterSaved =
      await dynamoCharacterRepository.findOneCharacterBy(criteria);
    expect(characterSaved).toEqual(character); // const mockResponse: GetCommandOutput = {
  });

  it('should find an existing character with externalId', async () => {
    const externalId = CharacterExternalIdMother.randomValue();
    const character = CharacterMother.create({ externalId });

    const queryCommandInput = {
      TableName: CHARACTERS_TABLE_NAME,
      IndexName: 'externalIdIndex',
      KeyConditionExpression: 'externalId = :externalId',
      ExpressionAttributeValues: {
        ':externalId': externalId,
      },
    };

    mockDynamoClient.on(QueryCommand, queryCommandInput).resolves({
      Items: [DynamoCharacterEntity.FromCharacter(character)],
    });

    const criteria = CharacterCriteria.createByExternalId(
      character.getExternalId(),
    );
    const characterSaved =
      await dynamoCharacterRepository.findOneCharacterBy(criteria);
    expect(characterSaved).toEqual(character);
  });

  it('should find an not existing character with externalId', async () => {
    const externalId = CharacterExternalIdMother.randomValue();

    const queryCommandInput = {
      TableName: CHARACTERS_TABLE_NAME,
      IndexName: 'externalIdIndex',
      KeyConditionExpression: 'externalId = :externalId',
      ExpressionAttributeValues: {
        ':externalId': externalId,
      },
    };
    mockDynamoClient.on(QueryCommand, queryCommandInput).resolves({
      Items: [],
    });

    const character = CharacterMother.create({ externalId });
    mockExternalCharacterProvider.returnOnGetCharacterByExternalId(character);

    const criteria = CharacterCriteria.createByExternalId(
      character.getExternalId(),
    );
    const characterSaved =
      await dynamoCharacterRepository.findOneCharacterBy(criteria);
    expect(characterSaved).toEqual(character);
    mockExternalCharacterProvider.assertGetCharacterByIdHasBeenCalledWith(
      externalId,
    );
  });
});
