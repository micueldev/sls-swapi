import { VehicleId } from 'src/modules/shared/domain/vehicle-id';

import { IntegerMother } from '../value-object/mothers';

export class VehicleIdMother {
  static random(): VehicleId {
    return new VehicleId(this.randomValue());
  }

  static randomValue(): string {
    return IntegerMother.random({ min: 1 }).toString();
  }
}
