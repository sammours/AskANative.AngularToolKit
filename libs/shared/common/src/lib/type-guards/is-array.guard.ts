export function isArray<T>(item: T | T[]): item is Array<T> {
  return item instanceof Array;
}
