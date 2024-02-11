import { CharacterFinder } from 'src/modules/character/application/use-cases/character-finder.use-case';
import { CharacterCriteria } from 'src/modules/character/domain/character-criteria';
import { CharacterNotFoundError } from 'src/modules/character/domain/character-not-found.error';

import { MockCharacterRepository } from '../../__mocks__/mock-character.repository';
import { CharacterMother } from '../../domain/mothers/character.mother';

describe('CharacterFinder UseCase', () => {
  const characterRepository = new MockCharacterRepository();
  const characterFinder = new CharacterFinder(characterRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the character', async () => {
    const character = CharacterMother.random();
    characterRepository.returnOnFindOneCharacterBy(character);

    const criteria = CharacterCriteria.createEmpty();
    const response = await characterFinder.run(criteria);

    expect(response).toEqual(character);
    characterRepository.assertFindOneCharacterByHasBeenCalledWith(criteria);
  });

  it('should throw a not found error', async () => {
    characterRepository.returnOnFindOneCharacterBy(null);

    const criteria = CharacterCriteria.createEmpty();
    await expect(characterFinder.run(criteria)).rejects.toThrow(
      CharacterNotFoundError,
    );
    characterRepository.assertFindOneCharacterByHasBeenCalledWith(criteria);
  });
});
