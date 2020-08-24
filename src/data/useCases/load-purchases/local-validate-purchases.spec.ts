import { LocalLoadPurchases } from "./local-load-purchases";
import { CacheStoreSpy } from "../../tests";

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
});
