import { Character } from './character';
import { CharacterCriteria } from './character-criteria';

export const CHARACTER_REPOSITORY_ALIAS = Symbol('CharacterRepository');

export interface CharacterRepository {
  createCharacter(character: Character): Promise<void>;

  findOneCharacterBy(
    characterCriteria: CharacterCriteria,
  ): Promise<Character | null>;
}
