import { PlanetId } from 'src/modules/shared/domain/planet-id';

import { IntegerMother } from '../value-object/mothers';

export class PlanetIdMother {
  static random(): PlanetId {
    return new PlanetId(this.randomValue());
  }

  static randomValue(): string {
    return IntegerMother.random({ min: 1 }).toString();
  }
}
