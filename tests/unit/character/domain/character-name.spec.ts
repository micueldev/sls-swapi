import { CharacterName } from 'src/modules/character/domain/character-name';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

describe('CharacterName test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CharacterName(StringMother.random({ maxLength: 2 }));
    }).toThrow(InvalidArgumentError);
  });
});
