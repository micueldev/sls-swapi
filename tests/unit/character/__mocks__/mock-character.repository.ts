import { Character } from 'src/modules/character/domain/character';
import { CharacterRepository } from 'src/modules/character/domain/character.repository';
import { CharacterCriteria } from 'src/modules/character/domain/character-criteria';

export class MockCharacterRepository implements CharacterRepository {
  private mockCreateCharacter = jest.fn();
  private mockFindOneCharacterBy = jest.fn();
  private findOneCharacterReturn: Character;

  async createCharacter(character: Character): Promise<void> {
    this.mockCreateCharacter(character);
  }

  assertCreateCharacterHasBeenCalledWith(character: Character) {
    expect(this.mockCreateCharacter).toHaveBeenCalledWith(character);
  }

  returnOnFindOneCharacterBy(character: Character) {
    this.findOneCharacterReturn = character;
  }

  async findOneCharacterBy(
    characterCriteria: CharacterCriteria,
  ): Promise<Character> {
    this.mockFindOneCharacterBy(characterCriteria);
    return this.findOneCharacterReturn;
  }

  assertFindOneCharacterByHasBeenCalledWith(
    characterCriteria: CharacterCriteria,
  ) {
    expect(this.mockFindOneCharacterBy).toHaveBeenCalledWith(characterCriteria);
  }
}
