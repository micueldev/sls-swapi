import { CharacterHeight } from 'src/modules/character/domain/character-height';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { FloatMother } from 'tests/unit/shared/domain/value-object/mothers/float.mother';

describe('CharacterHeight test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CharacterHeight(FloatMother.random({ min: -999, max: 0 }));
    }).toThrow(InvalidArgumentError);
  });
});
