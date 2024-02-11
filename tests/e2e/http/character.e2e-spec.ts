import { INestApplication } from '@nestjs/common';
import { CHARACTER_REPOSITORY_ALIAS } from 'src/modules/character/domain/character.repository';
import { CharacterResponseDto } from 'src/modules/character/infrastructure/dtos/response/character-response.dto';
import { MockCharacterRepository } from 'tests/unit/character/__mocks__/mock-character.repository';
import { CharacterMother } from 'tests/unit/character/domain/mothers/character.mother';

import base from '../base';

describe('CharactersController test', () => {
  let app: INestApplication;
  let characterRepository: MockCharacterRepository;

  beforeAll(async () => {
    app = await base.getTestingApp();
    await app.init();
    characterRepository = app.get<MockCharacterRepository>(
      CHARACTER_REPOSITORY_ALIAS,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get a character', async () => {
    const randomCharacter = CharacterMother.random();
    characterRepository.returnOnFindOneCharacterBy(randomCharacter);

    const res = await base.getCharacter(app, randomCharacter.getId());
    base.expectOk(res);
    base.expectTypeJson(res);
    const body = res.body;
    expect(body).toEqual(
      CharacterResponseDto.fromOutput(randomCharacter.toPrimitives()),
    );
  });

  it('should create a character', async () => {
    const randomCharacter = CharacterMother.random();

    const res = await base.createCharacter(app, {
      identificador: randomCharacter.getId(),
      nombre: randomCharacter.getName(),
      nacimiento: randomCharacter.getBirthYear(),
      genero: randomCharacter.getGender(),
      altura: randomCharacter.getHeight(),
      peso: randomCharacter.getMass(),
      color_de_ojos: randomCharacter.getEyeColor(),
      color_de_cabello: randomCharacter.getHairColor(),
      color_de_piel: randomCharacter.getSkinColor(),
      planeta_natal: randomCharacter.getPlanetId(),
      peliculas: randomCharacter.getFilms(),
      vehiculos: randomCharacter.getVehicles(),
    });

    base.expectOkCreated(res);
    base.expectTypeJson(res);

    const body = res.body;
    expect(body).toEqual(
      CharacterResponseDto.fromOutput(randomCharacter.toPrimitives()),
    );
  });

  it('should fail creating a character due to incorrect parameters', async () => {
    const res = await base.createCharacter(app, {
      identificador: '',
      nombre: '',
      nacimiento: '',
      genero: '',
      color_de_ojos: '',
      color_de_cabello: '',
      color_de_piel: '',
      planeta_natal: '',
      peliculas: [''],
      vehiculos: [''],
    });
    base.expectBadRequest(res);
    base.expectTypeJson(res);

    const body = res.body;
    expect(Array.isArray(body.message)).toBeTruthy();
    expect(body.message.length).toEqual(10);
  });
});
