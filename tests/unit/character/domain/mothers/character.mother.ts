import { Character } from 'src/modules/character/domain/character';
import { FilmIdMother } from 'tests/unit/shared/domain/mothers/film-id.mother';
import { PlanetIdMother } from 'tests/unit/shared/domain/mothers/planet-id.mother';
import { VehicleIdMother } from 'tests/unit/shared/domain/mothers/vehicle-id.mother';

import { CharacterBirthYearMother } from './character-birth-year.mother';
import { CharacterExternalIdMother } from './character-external-id.mother';
import { CharacterEyeColorMother } from './character-eye-color.mother';
import { CharacterGenderMother } from './character-gender.mother';
import { CharacterHairColorMother } from './character-hair-color.mother';
import { CharacterHeightMother } from './character-height.mother';
import { CharacterIdMother } from './character-id.mother';
import { CharacterMassMother } from './character-mass.mother';
import { CharacterNameMother } from './character-name.mother';
import { CharacterSkinColorMother } from './character-skin-color.mother';

export class CharacterMother {
  static create({
    id = CharacterIdMother.randomValue(),
    name = CharacterNameMother.randomValue(),
    birthYear = CharacterBirthYearMother.randomValue(),
    gender = CharacterGenderMother.randomValue(),
    height = CharacterHeightMother.randomValue(),
    mass = CharacterMassMother.randomValue(),
    eyeColor = CharacterEyeColorMother.randomValue(),
    hairColor = CharacterHairColorMother.randomValue(),
    skinColor = CharacterSkinColorMother.randomValue(),
    planetId = PlanetIdMother.randomValue(),
    films = [FilmIdMother.randomValue()],
    vehicles = [VehicleIdMother.randomValue()],
    externalId = CharacterExternalIdMother.randomValue(),
  }: {
    id?: string;
    name?: string;
    birthYear?: string;
    gender?: string;
    height?: string;
    mass?: string;
    eyeColor?: string;
    hairColor?: string;
    skinColor?: string;
    planetId?: string;
    films?: Array<string>;
    vehicles?: Array<string>;
    externalId?: string;
  }) {
    return Character.fromPrimitives({
      id,
      name,
      birthYear,
      gender,
      height,
      mass,
      eyeColor,
      hairColor,
      skinColor,
      planetId,
      films,
      vehicles,
      externalId,
    });
  }

  static random(): Character {
    return new Character({
      id: CharacterIdMother.random(),
      name: CharacterNameMother.random(),
      birthYear: CharacterBirthYearMother.random(),
      gender: CharacterGenderMother.random(),
      height: CharacterHeightMother.random(),
      mass: CharacterMassMother.random(),
      eyeColor: CharacterEyeColorMother.random(),
      hairColor: CharacterHairColorMother.random(),
      skinColor: CharacterSkinColorMother.random(),
      planetId: PlanetIdMother.random(),
      films: [FilmIdMother.random()],
      vehicles: [VehicleIdMother.random()],
      externalId: null,
    });
  }
}
