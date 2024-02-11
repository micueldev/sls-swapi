import { CharacterCreator } from 'src/modules/character/application/use-cases/character-creator.use-case';

import { MockCharacterRepository } from '../../__mocks__/mock-character.repository';
import { CharacterMother } from '../../domain/mothers/character.mother';

describe('CharacterCreator UseCase', () => {
  const characterRepository = new MockCharacterRepository();
  const characterCreator = new CharacterCreator(characterRepository);

  it('should save the character', async () => {
    // const date = new Date();
    // jest.spyOn(global, 'Date').mockImplementation(() => date);

    const character = CharacterMother.random();

    const characterCreated = await characterCreator.run(
      character.getId(),
      character.getName(),
      character.getBirthYear(),
      character.getGender(),
      character.getHeight(),
      character.getMass(),
      character.getEyeColor(),
      character.getHairColor(),
      character.getSkinColor(),
      character.getPlanetId(),
      character.getFilms(),
      character.getVehicles(),
    );

    expect(characterCreated).toEqual(character);
    characterRepository.assertCreateCharacterHasBeenCalledWith(character);
  });
});
