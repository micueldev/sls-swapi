import { Character } from '../../domain/character';

export interface DynamoCaracterEntityProps {
  id: string;
  name: string;
  birthYear: string;
  gender: string;
  height: string;
  mass: string;
  eyeColor: string;
  hairColor: string;
  skinColor: string;
  planetId: string;
  films: Array<string>;
  vehicles: Array<string>;
  externalId: string;
}

export class DynamoCharacterEntity {
  static FromCharacter(character: Character): DynamoCaracterEntityProps {
    return {
      ...character.toPrimitives(),
      externalId: character.getExternalId() ?? 'undefined',
    };
  }

  static ToCharacter(entity: DynamoCaracterEntityProps): Character {
    return Character.fromPrimitives({
      ...entity,
      externalId: entity.externalId !== 'undefined' ? entity.externalId : null,
    });
  }
}
