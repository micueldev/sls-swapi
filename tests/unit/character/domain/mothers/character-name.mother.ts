import { CharacterName } from 'src/modules/character/domain/character-name';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CharacterNameMother {
  static random(): CharacterName {
    return new CharacterName(this.randomValue());
  }

  static randomValue(): string {
    return StringMother.random({ minLength: 3 });
  }
}
