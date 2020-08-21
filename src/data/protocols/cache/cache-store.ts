export interface CacheStore {
  fetch: (deleteKey: string) => any;
  delete: (deleteKey: string) => void;
  insert: (insertKey: string, value: any) => void;
  replace: (insertKey: string, value: any) => void;
}
