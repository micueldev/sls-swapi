export class CreateCharacterCommand {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly birthYear: string,
    private readonly gender: string,
    private readonly height: string,
    private readonly mass: string,
    private readonly eyeColor: string,
    private readonly hairColor: string,
    private readonly skinColor: string,
    private readonly planetId: string,
    private readonly films: Array<string>,
    private readonly vehicles: Array<string>,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getBirthYear(): string {
    return this.birthYear;
  }

  public getGender(): string {
    return this.gender;
  }

  public getHeight(): string {
    return this.height;
  }

  public getMass(): string {
    return this.mass;
  }

  public getEyeColor(): string {
    return this.eyeColor;
  }

  public getHairColor(): string {
    return this.hairColor;
  }

  public getSkinColor(): string {
    return this.skinColor;
  }

  public getPlanetId(): string {
    return this.planetId;
  }

  public getFilms(): Array<string> {
    return this.films;
  }

  public getVehicles(): Array<string> {
    return this.vehicles;
  }
}
