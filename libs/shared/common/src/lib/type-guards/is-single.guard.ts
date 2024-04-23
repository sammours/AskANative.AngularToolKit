export function isSingle<T>(item: T | T[]): item is T {
  return !(item instanceof Array);
}
