import { CharacterCriteria } from '../../domain/character-criteria';

export class GetCharacterQuery {
  constructor(private readonly criteria: CharacterCriteria) {}

  public getCriteria(): CharacterCriteria {
    return this.criteria;
  }
}
