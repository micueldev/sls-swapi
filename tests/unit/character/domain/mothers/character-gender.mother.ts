import { CharacterGender } from 'src/modules/character/domain/character-gender';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CharacterGenderMother {
  static random(): CharacterGender {
    return new CharacterGender(this.randomValue());
  }

  static randomValue(): string {
    return StringMother.random({ minLength: 3 });
  }
}
