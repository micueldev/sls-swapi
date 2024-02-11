import { Uuid } from 'src/modules/shared/domain/value-object/uuid';

import { Character } from '../../domain/character';
import { ExternalCharacterProvider } from '../../domain/external-character.provider';

const REGEX_ID = /(^[\w\W]+\/(?=[\d]+\/$)|\/$)/g;

interface CharacterResponse {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
  created: string;
  edited: string;
  url: string;
}

export class SwapiExternalCharacterProvider
  implements ExternalCharacterProvider
{
  async getCharacterById(externalId: string): Promise<Character | null> {
    let character = null;
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/people/${externalId}/`,
      );
      if (response.ok) {
        const body: CharacterResponse = await response.json();
        character = Character.fromPrimitives({
          id: Uuid.random().value,
          name: body.name,
          birthYear: body.birth_year,
          gender: body.gender,
          height: +body.height,
          mass: +body.mass,
          eyeColor: body.eye_color,
          hairColor: body.hair_color,
          skinColor: body.skin_color,
          planetId: body.homeworld.replace(REGEX_ID, ''),
          films: body.films.map((film) => film.replace(REGEX_ID, '')),
          vehicles: body.vehicles.map((vehicle) =>
            vehicle.replace(REGEX_ID, ''),
          ),
          externalId: externalId,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      return character;
    }
  }
}
