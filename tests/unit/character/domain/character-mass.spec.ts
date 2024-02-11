import { CharacterMass } from 'src/modules/character/domain/character-mass';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { FloatMother } from 'tests/unit/shared/domain/value-object/mothers/float.mother';

describe('CharacterMass test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CharacterMass(FloatMother.random({ min: -999, max: 0 }));
    }).toThrow(InvalidArgumentError);
  });
});
