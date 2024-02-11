import { ApiProperty } from '@nestjs/swagger';
import { CharacterOutput } from 'src/modules/character/application/dtos/character.output';

import { SWAPI_URL } from '../../providers/swapi-external-character.provider';

export class CharacterResponseDto {
  @ApiProperty({
    type: String,
    example: 'd57ce206-05a7-4513-94a2-b0d5f0a9896d',
    nullable: false,
  })
  readonly identificador: string;

  @ApiProperty({
    type: String,
    example: 'random character name',
    nullable: false,
  })
  readonly nombre: string;

  @ApiProperty({
    type: String,
    example: '192BBY',
    nullable: false,
  })
  readonly nacimiento: string;

  @ApiProperty({
    type: String,
    example: 'male',
    nullable: false,
  })
  readonly genero: string;

  @ApiProperty({
    type: String,
    example: '123.23',
    nullable: false,
  })
  readonly altura: string;

  @ApiProperty({
    type: String,
    example: '34.23',
    nullable: false,
  })
  readonly peso: string;

  @ApiProperty({
    type: String,
    example: 'black',
    nullable: false,
  })
  readonly color_de_ojos: string;

  @ApiProperty({
    type: String,
    example: 'brown',
    nullable: false,
  })
  readonly color_de_cabello: string;

  @ApiProperty({
    type: String,
    example: 'n/a',
    nullable: false,
  })
  readonly color_de_piel: string;

  @ApiProperty({
    type: String,
    example: '"https://swapi.py4e.com/api/planets/1/',
    nullable: false,
  })
  readonly planeta_natal: string;

  @ApiProperty({
    type: Array,
    example: ['https://swapi.py4e.com/api/films/7/'],
    nullable: false,
  })
  readonly peliculas: Array<string>;

  @ApiProperty({
    type: Array,
    example: ['https://swapi.py4e.com/api/vehicles/14/'],
    nullable: false,
  })
  readonly vehiculos: Array<string>;

  static fromOutput(characterOutput: CharacterOutput): CharacterResponseDto {
    return {
      identificador: characterOutput.id,
      nombre: characterOutput.name,
      nacimiento: characterOutput.birthYear,
      genero: characterOutput.gender,
      altura: characterOutput.height,
      peso: characterOutput.mass,
      color_de_ojos: characterOutput.eyeColor,
      color_de_cabello: characterOutput.hairColor,
      color_de_piel: characterOutput.skinColor,
      planeta_natal: getPlanetUrl(characterOutput.planetId),
      peliculas: characterOutput.films.map(getFilmUrl),
      vehiculos: characterOutput.vehicles.map(getVehicleUrl),
    };
  }
}

function getPlanetUrl(planetId: string): string {
  return `${SWAPI_URL}/planets/${planetId}/`;
}

function getFilmUrl(filmId: string): string {
  return `${SWAPI_URL}/films/${filmId}/`;
}

function getVehicleUrl(vehicleId: string): string {
  return `${SWAPI_URL}/vehicles/${vehicleId}/`;
}
