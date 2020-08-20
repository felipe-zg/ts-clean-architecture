export interface CacheStore {
  delete: (key: string) => void;
  insert: (insertKey: string) => void;
}
