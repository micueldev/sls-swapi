import { CharacterBirthYear } from 'src/modules/character/domain/character-birth-year';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CharacterBirthYearMother {
  static random(): CharacterBirthYear {
    return new CharacterBirthYear(this.randomValue());
  }

  static randomValue(): string {
    return StringMother.random({ minLength: 3 });
  }
}
