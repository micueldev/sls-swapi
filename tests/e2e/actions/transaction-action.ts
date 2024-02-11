import { INestApplication } from '@nestjs/common';
import { Response } from 'supertest';
import { CharacterBirthYearMother } from 'tests/unit/character/domain/mothers/character-birth-year.mother';
import { CharacterEyeColorMother } from 'tests/unit/character/domain/mothers/character-eye-color.mother';
import { CharacterGenderMother } from 'tests/unit/character/domain/mothers/character-gender.mother';
import { CharacterHairColorMother } from 'tests/unit/character/domain/mothers/character-hair-color.mother';
import { CharacterHeightMother } from 'tests/unit/character/domain/mothers/character-height.mother';
import { CharacterIdMother } from 'tests/unit/character/domain/mothers/character-id.mother';
import { CharacterMassMother } from 'tests/unit/character/domain/mothers/character-mass.mother';
import { CharacterNameMother } from 'tests/unit/character/domain/mothers/character-name.mother';
import { CharacterSkinColorMother } from 'tests/unit/character/domain/mothers/character-skin-color.mother';
import { FilmIdMother } from 'tests/unit/shared/domain/mothers/film-id.mother';
import { PlanetIdMother } from 'tests/unit/shared/domain/mothers/planet-id.mother';
import { VehicleIdMother } from 'tests/unit/shared/domain/mothers/vehicle-id.mother';

import { Method, requestApi } from './base-action';

export const getCharacter = (
  app: INestApplication,
  characterExternalId: string,
): Promise<Response> => {
  return requestApi({
    app,
    method: Method.GET,
    path: `/characters/${characterExternalId}`,
  });
};

export const createCharacter = (
  app: INestApplication,
  {
    identificador = CharacterIdMother.randomValue(),
    nombre = CharacterNameMother.randomValue(),
    nacimiento = CharacterBirthYearMother.randomValue(),
    genero = CharacterGenderMother.randomValue(),
    altura = CharacterHeightMother.randomValue(),
    peso = CharacterMassMother.randomValue(),
    color_de_ojos = CharacterEyeColorMother.randomValue(),
    color_de_cabello = CharacterHairColorMother.randomValue(),
    color_de_piel = CharacterSkinColorMother.randomValue(),
    planeta_natal = PlanetIdMother.randomValue(),
    peliculas = [FilmIdMother.randomValue()],
    vehiculos = [VehicleIdMother.randomValue()],
  }: {
    identificador?: string;
    nombre?: string;
    nacimiento?: string;
    genero?: string;
    altura?: string;
    peso?: string;
    color_de_ojos?: string;
    color_de_cabello?: string;
    color_de_piel?: string;
    planeta_natal?: string;
    peliculas?: Array<string>;
    vehiculos?: Array<string>;
  },
): Promise<Response> => {
  const body = {
    identificador,
    nombre,
    nacimiento,
    genero,
    altura,
    peso,
    color_de_ojos,
    color_de_cabello,
    color_de_piel,
    planeta_natal,
    peliculas,
    vehiculos,
  };
  return requestApi({ app, method: Method.POST, path: '/characters/', body });
};
