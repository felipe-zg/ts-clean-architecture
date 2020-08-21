import { SavePurchases } from "@/domain/useCases";
import { CacheStore } from "../protocols/cache";

export class CacheStoreSpy implements CacheStore {
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];
  actions: Array<CacheStoreSpy.Action> = [];

  delete(key: string): void {
    this.actions.push(CacheStoreSpy.Action.delete);
    this.deleteKey = key;
  }

  insert(insertKey: string, value: any): void {
    this.actions.push(CacheStoreSpy.Action.insert);
    this.insertKey = insertKey;
    this.insertValues = value;
  }

  replace(key: string, value: any): void {
    this.delete(key), this.insert(key, value);
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.delete);
      throw new Error();
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.insert);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert,
  }
}
