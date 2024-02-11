import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';
import { FilmId } from 'src/modules/shared/domain/film-id';
import { PlanetId } from 'src/modules/shared/domain/planet-id';
import { VehicleId } from 'src/modules/shared/domain/vehicle-id';

import { CharacterBirthYear } from '../../../domain/character-birth-year';
import { CharacterEyeColor } from '../../../domain/character-eye-color';
import { CharacterGender } from '../../../domain/character-gender';
import { CharacterHairColor } from '../../../domain/character-hair-color';
import { CharacterName } from '../../../domain/character-name';
import { CharacterSkinColor } from '../../../domain/character-skin-color';

export class CreateCharacterBodyDto {
  @ApiProperty({
    type: String,
    example: 'd57ce206-05a7-4513-94a2-b0d5f0a9896d',
    nullable: false,
    required: true,
    uniqueItems: true,
  })
  @IsUUID()
  readonly identificador: string;

  @ApiProperty({
    type: String,
    example: 'random character name',
    nullable: false,
    required: true,
  })
  @IsString()
  @MinLength(CharacterName.MIN_LENGTH)
  readonly nombre: string;

  @ApiProperty({
    type: String,
    example: '192BBY',
    nullable: false,
    required: true,
  })
  @IsString()
  @MinLength(CharacterBirthYear.MIN_LENGTH)
  readonly nacimiento: string;

  @ApiProperty({
    type: String,
    example: 'male',
    nullable: false,
    required: true,
  })
  @IsString()
  @MinLength(CharacterGender.MIN_LENGTH)
  readonly genero: string;

  @ApiProperty({
    type: Number,
    example: '123.23',
    nullable: false,
    required: true,
  })
  @IsPositive()
  readonly altura: number;

  @ApiProperty({
    type: Number,
    example: '34.23',
    nullable: false,
    required: true,
  })
  @IsPositive()
  readonly peso: number;

  @ApiProperty({
    type: String,
    example: 'black',
    nullable: false,
    required: true,
  })
  @IsString()
  @MinLength(CharacterEyeColor.MIN_LENGTH)
  readonly color_de_ojos: string;

  @ApiProperty({
    type: String,
    example: 'brown',
    nullable: false,
    required: true,
  })
  @IsString()
  @MinLength(CharacterHairColor.MIN_LENGTH)
  readonly color_de_cabello: string;

  @ApiProperty({
    type: String,
    example: 'n/a',
    nullable: false,
    required: true,
  })
  @IsString()
  @MinLength(CharacterSkinColor.MIN_LENGTH)
  readonly color_de_piel: string;

  @ApiProperty({
    type: String,
    example: '2323',
    nullable: false,
    required: true,
  })
  @Matches(PlanetId.VALID_REGEX, {
    message: 'planetId is invalid',
  })
  readonly identificador_de_planeta: string;

  @ApiProperty({
    type: Array,
    example: ['3422'],
    nullable: false,
    required: true,
  })
  @IsArray()
  @Matches(FilmId.VALID_REGEX, {
    message: 'films has invalid value',
    each: true,
  })
  readonly peliculas: Array<string>;

  @ApiProperty({
    type: Array,
    example: ['3422'],
    nullable: false,
    required: true,
  })
  @IsArray()
  @Matches(VehicleId.VALID_REGEX, {
    message: 'vehicles has invalid value',
    each: true,
  })
  readonly vehiculos: Array<string>;
}
