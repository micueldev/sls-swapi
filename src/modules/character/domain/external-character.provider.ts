import { Character } from './character';

export const EXTERNAL_CHARACTER_PROVIDER_ALIAS = Symbol(
  'ExternalCharacterProvider',
);

export interface ExternalCharacterProvider {
  getCharacterById(externalId: string): Promise<Character | null>;
}
