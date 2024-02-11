import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { ValueObject } from 'src/modules/shared/domain/value-object/value-object';

export class CharacterMass extends ValueObject<number> {
  constructor(value: number) {
    super(value);

    this.ensureIsValid(value);
  }

  private ensureIsValid(value: number): void {
    if (value <= 0) {
      throw new InvalidArgumentError(`<${value}> is not a valid mass`);
    }
  }
}
