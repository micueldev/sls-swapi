import { Inject } from '@nestjs/common';

import { Character } from '../../domain/character';
import {
  CHARACTER_REPOSITORY_ALIAS,
  CharacterRepository,
} from '../../domain/character.repository';
import { CharacterCriteria } from '../../domain/character-criteria';
import { CharacterNotFoundError } from '../../domain/character-not-found.error';

export class CharacterFinder {
  constructor(
    @Inject(CHARACTER_REPOSITORY_ALIAS)
    private readonly characterRepository: CharacterRepository,
  ) {}

  async run(criteria: CharacterCriteria): Promise<Character> {
    const character =
      await this.characterRepository.findOneCharacterBy(criteria);

    if (!character) {
      throw new CharacterNotFoundError();
    }

    return character;
  }
}
