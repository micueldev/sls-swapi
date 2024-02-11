import { InvalidArgumentError } from './errors';
import { StringValueObject } from './value-object/string-value-object';

export class VehicleId extends StringValueObject {
  static readonly VALID_REGEX = /^[1-9]\d*$/;

  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (!VehicleId.VALID_REGEX.test(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid vehicle id`);
    }
  }
}
