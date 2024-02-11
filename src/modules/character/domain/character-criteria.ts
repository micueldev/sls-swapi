import { Criteria } from 'src/modules/shared/domain/criteria/criteria';

export class CharacterCriteria extends Criteria {
  private externalId: string = null;

  public static createByExternalId<T extends CharacterCriteria>(
    this: new () => T,
    externalId: string,
  ): T {
    return new this().filterByExternalId(externalId);
  }

  public filterByExternalId(accountNumber: string): this {
    this.externalId = accountNumber;
    return this;
  }

  public getExternalId(): string | null {
    return this.externalId;
  }
}
