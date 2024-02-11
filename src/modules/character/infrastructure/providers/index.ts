import { EXTERNAL_CHARACTER_PROVIDER_ALIAS } from '../../domain/external-character.provider';
import { SwapiExternalCharacterProvider } from './swapi-external-character.provider';

export const Providers = [
  {
    provide: EXTERNAL_CHARACTER_PROVIDER_ALIAS,
    useClass: SwapiExternalCharacterProvider,
  },
];
