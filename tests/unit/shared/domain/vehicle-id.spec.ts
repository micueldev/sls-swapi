import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { VehicleId } from 'src/modules/shared/domain/vehicle-id';

import { WordMother } from './value-object/mothers';

describe('VehicleId test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new VehicleId(WordMother.random());
    }).toThrow(InvalidArgumentError);
  });
});
