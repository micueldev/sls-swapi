import { Logger } from '@nestjs/common';
import {
  SWAPI_URL,
  SwapiExternalCharacterProvider,
} from 'src/modules/character/infrastructure/providers/swapi-external-character.provider';
import { Uuid } from 'src/modules/shared/domain/value-object/uuid';
import {
  StringMother,
  UuidMother,
} from 'tests/unit/shared/domain/value-object/mothers';

import { CharacterMother } from '../domain/mothers/character.mother';
import { CharacterExternalIdMother } from '../domain/mothers/character-external-id.mother';

describe('SwapiExternalCharacterProvider test', () => {
  let externalId: string;
  const swapiExternalCharacterProvider = new SwapiExternalCharacterProvider();
  const mockResponseData = {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    homeworld: 'https://swapi.py4e.com/api/planets/1/',
    films: [
      'https://swapi.py4e.com/api/films/1/',
      'https://swapi.py4e.com/api/films/2/',
      'https://swapi.py4e.com/api/films/3/',
      'https://swapi.py4e.com/api/films/6/',
    ],
    species: ['https://swapi.py4e.com/api/species/1/'],
    vehicles: [],
    starships: ['https://swapi.py4e.com/api/starships/13/'],
    created: '2014-12-10T15:18:20.704000Z',
    edited: '2014-12-20T21:17:50.313000Z',
    url: 'https://swapi.py4e.com/api/people/4/',
  };
  const loggerErrorSpy = jest
    .spyOn(Logger.prototype, 'error')
    .mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
    externalId = CharacterExternalIdMother.randomValue();
  });

  it('should get a exist character', async () => {
    const uuid = UuidMother.random();
    jest.spyOn(Uuid, 'random').mockReturnValue(new Uuid(uuid));

    const characterExpected = CharacterMother.create({
      id: uuid,
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hairColor: 'none',
      skinColor: 'white',
      eyeColor: 'yellow',
      birthYear: '41.9BBY',
      gender: 'male',
      planetId: '1',
      films: ['1', '2', '3', '6'],
      vehicles: [],
      externalId,
    });

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponseData),
    });

    const character =
      await swapiExternalCharacterProvider.getCharacterByExternalId(externalId);

    expect(fetch).toHaveBeenCalledWith(`${SWAPI_URL}/people/${externalId}/`);
    expect(character).toEqual(characterExpected);
  });

  it('should return null on get when status code has error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
    });

    const character =
      await swapiExternalCharacterProvider.getCharacterByExternalId(externalId);

    expect(fetch).toHaveBeenCalledWith(`${SWAPI_URL}/people/${externalId}/`);
    expect(character).toBeNull();
  });

  it('should logger the error on get', async () => {
    const error = new Error(StringMother.random());
    global.fetch = jest.fn().mockRejectedValue(error);

    const character =
      await swapiExternalCharacterProvider.getCharacterByExternalId(externalId);
    expect(character).toBeNull();
    expect(loggerErrorSpy).toHaveBeenCalledWith(
      ...[error.message, error.stack, `function get with param: ${externalId}`],
    );
  });
});
