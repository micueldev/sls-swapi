import { CharacterHeight } from 'src/modules/character/domain/character-height';
import { FloatMother } from 'tests/unit/shared/domain/value-object/mothers/float.mother';

export class CharacterHeightMother {
  static random(): CharacterHeight {
    return new CharacterHeight(this.randomValue());
  }

  static randomValue(): number {
    return FloatMother.random({ min: 1 });
  }
}
