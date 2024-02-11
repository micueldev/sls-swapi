import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { PlanetId } from 'src/modules/shared/domain/planet-id';

import { WordMother } from './value-object/mothers';

describe('PlanetId test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new PlanetId(WordMother.random());
    }).toThrow(InvalidArgumentError);
  });
});
