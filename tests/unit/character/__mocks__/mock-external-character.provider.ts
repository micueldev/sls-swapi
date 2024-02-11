import { Character } from 'src/modules/character/domain/character';
import { ExternalCharacterProvider } from 'src/modules/character/domain/external-character.provider';

export class MockExternalCharacterProvider
  implements ExternalCharacterProvider
{
  private mockGetCharacterByExternalId = jest.fn();
  private getCharacterByExternalIdReturn: Character;

  returnOnGetCharacterByExternalId(character: Character) {
    this.getCharacterByExternalIdReturn = character;
  }

  async getCharacterByExternalId(externalId: string): Promise<Character> {
    this.mockGetCharacterByExternalId(externalId);
    return this.getCharacterByExternalIdReturn;
  }

  assertGetCharacterByIdHasBeenCalledWith(externalId: string) {
    expect(this.mockGetCharacterByExternalId).toHaveBeenCalledWith(externalId);
  }
}
