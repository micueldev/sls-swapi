import { CharacterEyeColor } from 'src/modules/character/domain/character-eye-color';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CharacterEyeColorMother {
  static random(): CharacterEyeColor {
    return new CharacterEyeColor(this.randomValue());
  }

  static randomValue(): string {
    return StringMother.random({ minLength: 3 });
  }
}
