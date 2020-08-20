export interface CacheStore {
  delete: (deleteKey: string) => void;
  insert: (insertKey: string, value: any) => void;
}
