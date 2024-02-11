import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CharacterOutput } from '../dtos/character.output';
import { CharacterFinder } from '../use-cases/character-finder.use-case';
import { GetCharacterQuery } from './get-character.query';

@QueryHandler(GetCharacterQuery)
export class GetCharacterQueryHandler
  implements IQueryHandler<GetCharacterQuery>
{
  constructor(private characterFinder: CharacterFinder) {}

  async execute(query: GetCharacterQuery): Promise<CharacterOutput> {
    const character = await this.characterFinder.run(query.getCriteria());
    return character.toPrimitives() as CharacterOutput;
  }
}
