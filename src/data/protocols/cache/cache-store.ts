export interface CacheStore {
  delete: (deleteKey: string) => void;
  insert: (insertKey: string, value: any) => void;
  replace: (insertKey: string, value: any) => void;
}
