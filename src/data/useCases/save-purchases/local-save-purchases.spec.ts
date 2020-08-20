import { CacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "../save-purchases/local-save-purchases";

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
  insertCallsCount = 0;
  key: string;
  insertKey: string;

  delete(key: string): void {
    this.deleteCallsCount++;
    this.key = key;
  }

  insert(insertKey: string): void {
    this.insertCallsCount++;
    this.insertKey = insertKey;
  }
}

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return {
    sut,
    cacheStore,
  };
};

describe("localSavePurchases", () => {
  it("shouln't delete chache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  it("should delete chache on sut.save", () => {
    const { cacheStore, sut } = makeSut();
    sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
  });

  it("should call delete with correct key", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.key).toBe("purchases");
  });

  it("should not insert new cache if delete fails", () => {
    const { cacheStore, sut } = makeSut();
    jest.spyOn(cacheStore, "delete").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.save();
    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  });

  it("should insert new cache if delete succeeds", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertCallsCount).toBe(1);
    expect(cacheStore.insertKey).toBe("purchases");
  });
});
