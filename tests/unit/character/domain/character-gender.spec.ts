import { CharacterGender } from 'src/modules/character/domain/character-gender';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

describe('CharacterGender test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CharacterGender(StringMother.random({ maxLength: 2 }));
    }).toThrow(InvalidArgumentError);
  });
});
