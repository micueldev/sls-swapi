import { FilmId } from 'src/modules/shared/domain/film-id';

import { IntegerMother } from '../value-object/mothers';

export class FilmIdMother {
  static random(): FilmId {
    return new FilmId(this.randomValue());
  }

  static randomValue(): string {
    return IntegerMother.random({ min: 1 }).toString();
  }
}
