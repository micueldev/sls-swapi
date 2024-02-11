import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringValueObject } from 'src/modules/shared/domain/value-object/string-value-object';

export class CharacterExternalId extends StringValueObject {
  static readonly VALID_REGEX = /^[1-9]\d*$/;

  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (!CharacterExternalId.VALID_REGEX.test(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid external id`);
    }
  }
}
