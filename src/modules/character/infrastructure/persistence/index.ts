import { CHARACTER_REPOSITORY_ALIAS } from '../../domain/character.repository';
import { DynamoCharacterRepository } from './dynamo-character.repository';

export const Repositories = [
  {
    provide: CHARACTER_REPOSITORY_ALIAS,
    useClass: DynamoCharacterRepository,
  },
];
