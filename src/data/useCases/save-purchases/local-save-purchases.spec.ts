import { LocalSavePurchases } from "../save-purchases/local-save-purchases";
import { CacheStoreSpy, mockPurchases } from "../../tests";

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
    expect(cacheStore.messages).toEqual([]);
  });

  it("should delete old chache on sut.save", () => {
    const { cacheStore, sut } = makeSut();
    sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.message.delete,
      CacheStoreSpy.message.insert,
    ]);
  });

  it("should call delete with correct key", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.message.delete,
      CacheStoreSpy.message.insert,
    ]);
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  it("should not insert new cache if delete fails", async () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateDeleteError();
    const promise = sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([CacheStoreSpy.message.delete]);
    await expect(promise).rejects.toThrow();
  });

  it("should insert new cache if delete succeeds", async () => {
    const { cacheStore, sut } = makeSut();
    const purchases = mockPurchases();
    await sut.save(purchases);
    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.message.delete,
      CacheStoreSpy.message.insert,
    ]);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual(purchases);
  });

  it("should throw if insert throws", async () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateInsertError();
    const promise = sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.message.delete,
      CacheStoreSpy.message.insert,
    ]);
    await expect(promise).rejects.toThrow();
  });
});
