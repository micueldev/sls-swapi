import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CharacterOutput } from '../dtos/character.output';
import { CharacterCreator } from '../use-cases/character-creator.use-case';
import { CreateCharacterCommand } from './create-character.command';

@CommandHandler(CreateCharacterCommand)
export class CreateCharacterCommandHandler
  implements ICommandHandler<CreateCharacterCommand>
{
  constructor(private characterCreator: CharacterCreator) {}

  async execute(command: CreateCharacterCommand): Promise<CharacterOutput> {
    const character = await this.characterCreator.run(
      command.getId(),
      command.getName(),
      command.getBirthYear(),
      command.getGender(),
      command.getHeight(),
      command.getMass(),
      command.getEyeColor(),
      command.getHairColor(),
      command.getSkinColor(),
      command.getPlanetId(),
      command.getFilms(),
      command.getVehicles(),
    );

    return character.toPrimitives() as CharacterOutput;
  }
}
