import { AggregateRoot } from '@nestjs/cqrs';
import { FilmId } from 'src/modules/shared/domain/film-id';
import { PlanetId } from 'src/modules/shared/domain/planet-id';
import { VehicleId } from 'src/modules/shared/domain/vehicle-id';

import { CharacterBirthYear } from './character-birth-year';
import { CharacterExternalId } from './character-external-id';
import { CharacterEyeColor } from './character-eye-color';
import { CharacterGender } from './character-gender';
import { CharacterHairColor } from './character-hair-color';
import { CharacterHeight } from './character-height';
import { CharacterId } from './character-id';
import { CharacterMass } from './character-mass';
import { CharacterName } from './character-name';
import { CharacterSkinColor } from './character-skin-color';

interface CharacterPrimitiveProps {
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
  externalId: string | null;
}

export class Character extends AggregateRoot {
  private id: CharacterId;
  private name: CharacterName;
  private birthYear: CharacterBirthYear;
  private gender: CharacterGender;
  private height: CharacterHeight;
  private mass: CharacterMass;
  private eyeColor: CharacterEyeColor;
  private hairColor: CharacterHairColor;
  private skinColor: CharacterSkinColor;
  private planetId: PlanetId;
  private films: Array<FilmId>;
  private vehicles: Array<VehicleId>;
  private externalId: CharacterExternalId | null;

  constructor({
    id,
    name,
    birthYear,
    gender,
    height,
    mass,
    eyeColor,
    hairColor,
    skinColor,
    planetId,
    films,
    vehicles,
    externalId,
  }: {
    id: CharacterId;
    name: CharacterName;
    birthYear: CharacterBirthYear;
    gender: CharacterGender;
    height: CharacterHeight;
    mass: CharacterMass;
    eyeColor: CharacterEyeColor;
    hairColor: CharacterHairColor;
    skinColor: CharacterSkinColor;
    planetId: PlanetId;
    films: Array<FilmId>;
    vehicles: Array<VehicleId>;
    externalId: CharacterExternalId | null;
  }) {
    super();
    this.id = id;
    this.name = name;
    this.birthYear = birthYear;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.eyeColor = eyeColor;
    this.hairColor = hairColor;
    this.skinColor = skinColor;
    this.planetId = planetId;
    this.films = [...films];
    this.vehicles = [...vehicles];
    this.externalId = externalId;
  }

  static create({
    id,
    name,
    birthYear,
    gender,
    height,
    mass,
    eyeColor,
    hairColor,
    skinColor,
    planetId,
    films,
    vehicles,
  }: {
    id: CharacterId;
    name: CharacterName;
    birthYear: CharacterBirthYear;
    gender: CharacterGender;
    height: CharacterHeight;
    mass: CharacterMass;
    eyeColor: CharacterEyeColor;
    hairColor: CharacterHairColor;
    skinColor: CharacterSkinColor;
    planetId: PlanetId;
    films: Array<FilmId>;
    vehicles: Array<VehicleId>;
  }): Character {
    const character = new Character({
      id,
      name,
      birthYear,
      gender,
      height,
      mass,
      eyeColor,
      hairColor,
      skinColor,
      planetId,
      films,
      vehicles,
      externalId: null,
    });
    //TODO: character created event
    return character;
  }

  static fromPrimitives({
    id,
    name,
    birthYear,
    gender,
    height,
    mass,
    eyeColor,
    hairColor,
    skinColor,
    planetId,
    films,
    vehicles,
    externalId,
  }: CharacterPrimitiveProps): Character {
    return new Character({
      id: new CharacterId(id),
      name: new CharacterName(name),
      birthYear: new CharacterBirthYear(birthYear),
      gender: new CharacterGender(gender),
      height: new CharacterHeight(height),
      mass: new CharacterMass(mass),
      eyeColor: new CharacterEyeColor(eyeColor),
      hairColor: new CharacterHairColor(hairColor),
      skinColor: new CharacterSkinColor(skinColor),
      planetId: new PlanetId(planetId),
      films: films.map((filmId) => new FilmId(filmId)),
      vehicles: vehicles.map((vehicleId) => new VehicleId(vehicleId)),
      externalId: externalId ? new CharacterExternalId(externalId) : null,
    });
  }

  toPrimitives() {
    return {
      id: this.getId(),
      name: this.getName(),
      birthYear: this.getBirthYear(),
      gender: this.getGender(),
      height: this.getHeight(),
      mass: this.getMass(),
      eyeColor: this.getEyeColor(),
      hairColor: this.getHairColor(),
      skinColor: this.getSkinColor(),
      planetId: this.getPlanetId(),
      films: this.getFilms(),
      vehicles: this.getVehicles(),
      externalId: this.getExternalId(),
    };
  }

  getId(): string {
    return this.id.value;
  }

  getName(): string {
    return this.name.value;
  }

  getBirthYear(): string {
    return this.birthYear.value;
  }

  getGender(): string {
    return this.gender.value;
  }

  getHeight(): number {
    return this.height.value;
  }

  getMass(): number {
    return this.mass.value;
  }

  getEyeColor(): string {
    return this.eyeColor.value;
  }

  getHairColor(): string {
    return this.hairColor.value;
  }

  getSkinColor(): string {
    return this.skinColor.value;
  }

  getPlanetId(): string {
    return this.planetId.value;
  }

  getFilms(): Array<string> {
    return this.films.map((filmId) => filmId.value);
  }

  getVehicles(): Array<string> {
    return this.vehicles.map((vehicleId) => vehicleId.value);
  }

  getExternalId(): string | null {
    return this.externalId?.value ?? null;
  }
}
