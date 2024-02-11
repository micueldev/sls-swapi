import { CharacterSkinColor } from 'src/modules/character/domain/character-skin-color';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CharacterSkinColorMother {
  static random(): CharacterSkinColor {
    return new CharacterSkinColor(this.randomValue());
  }

  static randomValue(): string {
    return StringMother.random({ minLength: 3 });
  }
}
