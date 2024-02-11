import { ObjectNotFoundError } from 'src/modules/shared/domain/errors';

export class CharacterNotFoundError extends ObjectNotFoundError {
  protected readonly objectName = 'Character';
}
