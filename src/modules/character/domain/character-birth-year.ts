import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringValueObject } from 'src/modules/shared/domain/value-object/string-value-object';

export class CharacterBirthYear extends StringValueObject {
  static readonly MIN_LENGTH = 3;

  constructor(value: string) {
    super(value);

    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (value.length < CharacterBirthYear.MIN_LENGTH) {
      throw new InvalidArgumentError(`<${value}> is not a valid birth year`);
    }
  }
}
