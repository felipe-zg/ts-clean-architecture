import { SavePurchases } from "@/domain/useCases";
import { CacheStore } from "../protocols/cache";

export class CacheStoreSpy implements CacheStore {
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];
  messages: Array<CacheStoreSpy.message> = [];

  delete(key: string): void {
    this.messages.push(CacheStoreSpy.message.delete);
    this.deleteKey = key;
  }

  insert(insertKey: string, value: any): void {
    this.messages.push(CacheStoreSpy.message.insert);
    this.insertKey = insertKey;
    this.insertValues = value;
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.message.delete);
      throw new Error();
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.message.insert);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum message {
    delete,
    insert,
  }
}
