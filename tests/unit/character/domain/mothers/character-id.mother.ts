import { CharacterId } from 'src/modules/character/domain/character-id';
import { UuidMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CharacterIdMother {
  static random(): CharacterId {
    return new CharacterId(this.randomValue());
  }

  static randomValue(): string {
    return UuidMother.random();
  }
}
