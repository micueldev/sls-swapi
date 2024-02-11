import { CharacterSkinColor } from 'src/modules/character/domain/character-skin-color';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

describe('CharacterSkinColor test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CharacterSkinColor(StringMother.random({ maxLength: 2 }));
    }).toThrow(InvalidArgumentError);
  });
});
