import { CharacterExternalId } from 'src/modules/character/domain/character-external-id';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { WordMother } from 'tests/unit/shared/domain/value-object/mothers';

describe('CharacterExternalId test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CharacterExternalId(WordMother.random());
    }).toThrow(InvalidArgumentError);
  });
});
