import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { FilmId } from 'src/modules/shared/domain/film-id';

import { WordMother } from './value-object/mothers';

describe('FilmId test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new FilmId(WordMother.random());
    }).toThrow(InvalidArgumentError);
  });
});
