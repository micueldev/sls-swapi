import { Character } from 'src/modules/character/domain/character';
import { FilmIdMother } from 'tests/unit/shared/domain/mothers/film-id.mother';
import { PlanetIdMother } from 'tests/unit/shared/domain/mothers/planet-id.mother';
import { VehicleIdMother } from 'tests/unit/shared/domain/mothers/vehicle-id.mother';

import { CharacterMother } from './mothers/character.mother';
import { CharacterBirthYearMother } from './mothers/character-birth-year.mother';
import { CharacterExternalIdMother } from './mothers/character-external-id.mother';
import { CharacterEyeColorMother } from './mothers/character-eye-color.mother';
import { CharacterGenderMother } from './mothers/character-gender.mother';
import { CharacterHairColorMother } from './mothers/character-hair-color.mother';
import { CharacterHeightMother } from './mothers/character-height.mother';
import { CharacterIdMother } from './mothers/character-id.mother';
import { CharacterMassMother } from './mothers/character-mass.mother';
import { CharacterNameMother } from './mothers/character-name.mother';
import { CharacterSkinColorMother } from './mothers/character-skin-color.mother';

describe('Character test', () => {
  it('should be instantiated correctly', () => {
    const characterObject = {
      id: CharacterIdMother.randomValue(),
      name: CharacterNameMother.randomValue(),
      birthYear: CharacterBirthYearMother.randomValue(),
      gender: CharacterGenderMother.randomValue(),
      height: CharacterHeightMother.randomValue(),
      mass: CharacterMassMother.randomValue(),
      eyeColor: CharacterEyeColorMother.randomValue(),
      hairColor: CharacterHairColorMother.randomValue(),
      skinColor: CharacterSkinColorMother.randomValue(),
      planetId: PlanetIdMother.randomValue(),
      films: [FilmIdMother.randomValue(), FilmIdMother.randomValue()],
      vehicles: [VehicleIdMother.randomValue(), VehicleIdMother.randomValue()],
      externalId: CharacterExternalIdMother.randomValue(),
    };

    expect(
      Character.fromPrimitives({ ...characterObject }).toPrimitives(),
    ).toEqual(characterObject);
  });

  it('should correctly return the values', () => {
    const id = CharacterIdMother.randomValue();
    const name = CharacterNameMother.randomValue();
    const birthYear = CharacterBirthYearMother.randomValue();
    const gender = CharacterGenderMother.randomValue();
    const height = CharacterHeightMother.randomValue();
    const mass = CharacterMassMother.randomValue();
    const eyeColor = CharacterEyeColorMother.randomValue();
    const hairColor = CharacterHairColorMother.randomValue();
    const skinColor = CharacterSkinColorMother.randomValue();
    const planetId = PlanetIdMother.randomValue();
    const films = [FilmIdMother.randomValue(), FilmIdMother.randomValue()];
    const vehicles = [
      VehicleIdMother.randomValue(),
      VehicleIdMother.randomValue(),
    ];

    const character = CharacterMother.create({
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
    });

    expect(character.getId()).toEqual(id);
    expect(character.getName()).toEqual(name);
    expect(character.getBirthYear()).toEqual(birthYear);
    expect(character.getGender()).toEqual(gender);
    expect(character.getHeight()).toEqual(height);
    expect(character.getMass()).toEqual(mass);
    expect(character.getEyeColor()).toEqual(eyeColor);
    expect(character.getHairColor()).toEqual(hairColor);
    expect(character.getSkinColor()).toEqual(skinColor);
    expect(character.getPlanetId()).toEqual(planetId);
    expect(character.getFilms()).toEqual(films);
    expect(character.getVehicles()).toEqual(vehicles);
  });
});
