import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiDocResponse } from 'src/modules/shared/infrastructure/decorators/api-doc-response.decorator';

import { CreateCharacterCommand } from '../../application/commands/create-character.command';
import { CharacterOutput } from '../../application/dtos/character.output';
import { GetCharacterQuery } from '../../application/queries/get-character.query';
import { CharacterCriteria } from '../../domain/character-criteria';
import { CharacterExternalId } from '../../domain/character-external-id';
import { CreateCharacterBodyDto } from '../dtos/request/create-character-body.dto';
import { CharacterResponseDto } from '../dtos/response/character-response.dto';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    description: 'Create a character',
    operationId: 'postCharacter',
  })
  @ApiDocResponse(
    {
      status: HttpStatus.CREATED,
      type: CharacterResponseDto,
    },
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNPROCESSABLE_ENTITY,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createCharacterBody: CreateCharacterBodyDto,
  ): Promise<CharacterResponseDto> {
    const characterOutput: CharacterOutput = await this.commandBus.execute(
      new CreateCharacterCommand(
        createCharacterBody.identificador,
        createCharacterBody.nombre,
        createCharacterBody.nacimiento,
        createCharacterBody.genero,
        createCharacterBody.altura,
        createCharacterBody.peso,
        createCharacterBody.color_de_ojos,
        createCharacterBody.color_de_cabello,
        createCharacterBody.color_de_piel,
        createCharacterBody.planeta_natal,
        createCharacterBody.peliculas,
        createCharacterBody.vehiculos,
      ),
    );

    return CharacterResponseDto.fromOutput(characterOutput);
  }

  @ApiOperation({
    description: 'Get a character by ID',
    operationId: 'getCharacter',
  })
  @ApiDocResponse(
    {
      status: HttpStatus.OK,
      description: 'The character',
      type: CharacterResponseDto,
    },
    HttpStatus.NOT_FOUND,
    HttpStatus.UNPROCESSABLE_ENTITY,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CharacterResponseDto> {
    const criteria = CharacterExternalId.VALID_REGEX.test(id)
      ? CharacterCriteria.createByExternalId(id)
      : CharacterCriteria.createById(id);

    const characterOutput: CharacterOutput = await this.queryBus.execute(
      new GetCharacterQuery(criteria),
    );

    return CharacterResponseDto.fromOutput(characterOutput);
  }
}
