import { CharacterBirthYear } from 'src/modules/character/domain/character-birth-year';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

describe('CharacterBirthYear test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CharacterBirthYear(StringMother.random({ maxLength: 2 }));
    }).toThrow(InvalidArgumentError);
  });
});
