export type PrimitiveType =
  | (string | undefined)
  | (number | undefined)
  | (boolean | undefined);
export type FunctionType = Function | undefined;
export type DateType = moment.Moment | Date;
export type ArrayType = any[] | undefined;

// This takes the given type and excludes all properties that match the given condition
export type ExcludeTypes<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? never : Key;
  }[keyof Base]
>;
