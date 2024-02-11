import { Inject } from '@nestjs/common';
import { FilmId } from 'src/modules/shared/domain/film-id';
import { PlanetId } from 'src/modules/shared/domain/planet-id';
import { VehicleId } from 'src/modules/shared/domain/vehicle-id';

import { Character } from '../../domain/character';
import {
  CHARACTER_REPOSITORY_ALIAS,
  CharacterRepository,
} from '../../domain/character.repository';
import { CharacterBirthYear } from '../../domain/character-birth-year';
import { CharacterEyeColor } from '../../domain/character-eye-color';
import { CharacterGender } from '../../domain/character-gender';
import { CharacterHairColor } from '../../domain/character-hair-color';
import { CharacterHeight } from '../../domain/character-height';
import { CharacterId } from '../../domain/character-id';
import { CharacterMass } from '../../domain/character-mass';
import { CharacterName } from '../../domain/character-name';
import { CharacterSkinColor } from '../../domain/character-skin-color';

export class CharacterCreator {
  constructor(
    @Inject(CHARACTER_REPOSITORY_ALIAS)
    private readonly characterRepository: CharacterRepository,
  ) {}

  async run(
    id: string,
    name: string,
    birthYear: string,
    gender: string,
    height: string,
    mass: string,
    eyeColor: string,
    hairColor: string,
    skinColor: string,
    planetId: string,
    films: Array<string>,
    vehicles: Array<string>,
  ): Promise<Character> {
    const character = Character.create({
      id: new CharacterId(id),
      name: new CharacterName(name),
      birthYear: new CharacterBirthYear(birthYear),
      gender: new CharacterGender(gender),
      height: new CharacterHeight(height),
      mass: new CharacterMass(mass),
      eyeColor: new CharacterEyeColor(eyeColor),
      hairColor: new CharacterHairColor(hairColor),
      skinColor: new CharacterSkinColor(skinColor),
      planetId: new PlanetId(planetId),
      films: films.map((filmId) => new FilmId(filmId)),
      vehicles: vehicles.map((vehicleId) => new VehicleId(vehicleId)),
    });
    await this.characterRepository.createCharacter(character);

    return character;
  }
}
