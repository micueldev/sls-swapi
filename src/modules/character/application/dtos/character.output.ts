export interface CharacterOutput {
  id: string;
  name: string;
  birthYear: string;
  gender: string;
  height: number;
  mass: number;
  eyeColor: string;
  hairColor: string;
  skinColor: string;
  planetId: string;
  films: Array<string>;
  vehicles: Array<string>;
}
