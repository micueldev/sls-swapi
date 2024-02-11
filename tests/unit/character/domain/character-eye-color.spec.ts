import { CharacterEyeColor } from 'src/modules/character/domain/character-eye-color';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

describe('CharacterEyeColor test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CharacterEyeColor(StringMother.random({ maxLength: 2 }));
    }).toThrow(InvalidArgumentError);
  });
});
