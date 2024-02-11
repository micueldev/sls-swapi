import { CharacterHairColor } from 'src/modules/character/domain/character-hair-color';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

describe('CharacterHairColor test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CharacterHairColor(StringMother.random({ maxLength: 2 }));
    }).toThrow(InvalidArgumentError);
  });
});
