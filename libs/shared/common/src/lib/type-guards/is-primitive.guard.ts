export function isPrimitive(item: unknown): item is string | number | boolean {
  return (
    typeof item !== 'object' &&
    typeof item !== 'function' &&
    typeof item !== 'undefined'
  );
}
