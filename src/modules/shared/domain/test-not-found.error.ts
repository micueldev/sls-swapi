import { ObjectNotFoundError } from './errors';

export class TestNotFoundError extends ObjectNotFoundError {
  protected objectName: 'Test';
}
