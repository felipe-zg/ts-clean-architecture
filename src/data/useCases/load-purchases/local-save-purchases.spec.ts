import { LocalLoadPurchases } from "./local-load-purchases";
import { CacheStoreSpy, mockPurchases } from "../../tests";

type SutTypes = {
  sut: LocalLoadPurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalLoadPurchases(cacheStore, timestamp);
  return {
    sut,
    cacheStore,
  };
};

describe("localSavePurchases", () => {
  it("shouln't delete chache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.actions).toEqual([]);
  });

  it("should not insert new cache if delete fails", async () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateDeleteError();
    const promise = sut.save(mockPurchases());
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.delete]);
    await expect(promise).rejects.toThrow();
  });

  it("should insert new cache if delete succeeds", async () => {
    const timestamp = new Date();
    const { cacheStore, sut } = makeSut(timestamp);
    const purchases = mockPurchases();
    const promise = sut.save(purchases);
    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.delete,
      CacheStoreSpy.Action.insert,
    ]);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.deleteKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual({
      timestamp,
      value: purchases,
    });
    await expect(promise).resolves.toBeFalsy();
  });

  it("should throw if insert throws", async () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateInsertError();
    const promise = sut.save(mockPurchases());
    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.delete,
      CacheStoreSpy.Action.insert,
    ]);
    await expect(promise).rejects.toThrow();
  });
});
