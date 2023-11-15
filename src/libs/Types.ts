export type EntriesType<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
