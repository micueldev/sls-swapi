export abstract class Criteria {
  private id: string | null = null;

  public static createEmpty<T extends Criteria>(this: new () => T): T {
    return new this();
  }

  public static createById<T extends Criteria>(
    this: new () => T,
    id: string,
  ): T {
    return new this().filterById(id);
  }

  public filterById(id: string): this {
    this.id = id;

    return this;
  }

  public getId(): string | null {
    return this.id;
  }
}
