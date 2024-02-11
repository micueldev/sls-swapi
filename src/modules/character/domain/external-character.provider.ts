import { Character } from './character';

export const EXTERNAL_CHARACTER_PROVIDER_ALIAS = Symbol(
  'ExternalCharacterProvider',
);

export interface ExternalCharacterProvider {
  getCharacterByExternalId(externalId: string): Promise<Character | null>;
}
