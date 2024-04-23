import { PropertyLink } from './property.model';
import {
  PrimitiveType,
  DateType,
  FunctionType,
  ExcludeTypes,
} from './util.model';

export interface ValidationRule<T extends Object> {
  /**
   * This is an array that should contain functions
   * linking to specific properties of the provided object.
   *
   * It is possible to give an empty array here, in which case
   * the rule will still be applied to the overall state of the validator.
   */
  properties: PropertyLink<T>[];
  errorMessage: string;
  validate(): PropertyValidationResult<T>;
}

export interface PropertyValidationResult<T extends Object>
  extends ValidationResult {
  properties: ValidatedPropertyLink<T>[];
}

export type ValidatedPropertyLink<T> = (item: T) => PropertyValidatorResult;

export interface ValidationResult {
  errorMessage: string;
  isValid: boolean;
}

export interface PropertyValidatorResult extends ValidationResult {
  errors: string[];
}

// This type checks properties of an object and changes their types to either
// a PropertyValidatorResult for primitive properties,
// PropertyValidatorResult[] for array properties, or a never for functions.
// If no property type matches (it's f.e. an object), it recursively checks
// for it's properties.
type PropertyValidationType<T> = {
  [P in keyof T]: T[P] extends PrimitiveType | DateType
    ? PropertyValidatorResult
    : T[P] extends FunctionType
    ? never
    : PropertyValidationType<T[P]>;
};

export type ObjectValidatorResult<
  T extends { [key: string]: any }
> = PropertyValidationType<ExcludeTypes<T, FunctionType>>;

export interface ValidatorState<T extends Object> extends ValidationResult {
  errors: string[];
  props: ObjectValidatorResult<T> | undefined;
  pristine: boolean;
}
