export interface CacheStore {
  fetch: (deleteKey: string) => void;
  delete: (deleteKey: string) => void;
  insert: (insertKey: string, value: any) => void;
  replace: (insertKey: string, value: any) => void;
}
