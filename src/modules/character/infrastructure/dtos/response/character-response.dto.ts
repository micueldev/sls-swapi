import { ApiProperty } from '@nestjs/swagger';
import { CharacterOutput } from 'src/modules/character/application/dtos/character.output';

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
    type: Number,
    example: '123.23',
    nullable: false,
  })
  readonly altura: number;

  @ApiProperty({
    type: Number,
    example: '34.23',
    nullable: false,
  })
  readonly peso: number;

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
    example: '2323',
    nullable: false,
  })
  readonly identificador_de_planeta: string;

  @ApiProperty({
    type: Array,
    example: ['3422'],
    nullable: false,
  })
  readonly peliculas: Array<string>;

  @ApiProperty({
    type: Array,
    example: ['3422'],
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
      identificador_de_planeta: characterOutput.planetId,
      peliculas: characterOutput.films,
      vehiculos: characterOutput.vehicles,
    };
  }
}
