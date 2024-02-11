import { CharacterMass } from 'src/modules/character/domain/character-mass';
import { FloatMother } from 'tests/unit/shared/domain/value-object/mothers/float.mother';

export class CharacterMassMother {
  static random(): CharacterMass {
    return new CharacterMass(this.randomValue());
  }

  static randomValue(): number {
    return FloatMother.random({ min: 1 });
  }
}
