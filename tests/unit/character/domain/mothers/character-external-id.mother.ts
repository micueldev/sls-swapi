import { CharacterExternalId } from 'src/modules/character/domain/character-external-id';
import { IntegerMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CharacterExternalIdMother {
  static random(): CharacterExternalId {
    return new CharacterExternalId(this.randomValue());
  }

  static randomValue(): string {
    return IntegerMother.random({ min: 1 }).toString();
  }
}
