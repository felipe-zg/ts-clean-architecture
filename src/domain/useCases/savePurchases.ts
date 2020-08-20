export interface SavePurchases {
  save: (purchases: Array<SavePurchases.Params>) => Promise<void>;
}

export namespace SavePurchases {
  export type Params = {
    id: String;
    date: Date;
    value: number;
  };
}
