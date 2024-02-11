import { CharacterHairColor } from 'src/modules/character/domain/character-hair-color';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CharacterHairColorMother {
  static random(): CharacterHairColor {
    return new CharacterHairColor(this.randomValue());
  }

  static randomValue(): string {
    return StringMother.random({ minLength: 3 });
  }
}
