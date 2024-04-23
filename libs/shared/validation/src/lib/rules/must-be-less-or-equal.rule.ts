import {
  ValidationRule,
  PropertyValidationResult,
} from '../model/validation-result.model';
import { PropertyLink } from '../model/property.model';
import { getNumberValueFromTimeString } from '../pattern/helper.function';

export class MustBeLessThanOrEqualRule<
  T,
  U extends number | moment.Moment | string
> implements ValidationRule<T> {
  public properties: PropertyLink<T>[];
  public errorMessage = '';
  public value: U | undefined;
  public valueToCompareTo: U | undefined;

  constructor(
    value: U | undefined,
    valueToCompareTo: U | undefined,
    errorMessage: string,
    linkedProperties: PropertyLink<T>[]
  ) {
    this.properties = linkedProperties;
    this.value = value;
    this.errorMessage = errorMessage;
    this.valueToCompareTo = valueToCompareTo;
  }
  public validate(): PropertyValidationResult<T> {
    let isValid = true;
    if (typeof this.value === 'string') {
      const comparableValue = getNumberValueFromTimeString(this.value);
      if (comparableValue) {
        const valueToCompareTo = getNumberValueFromTimeString(
          this.valueToCompareTo as string
        );
        if (valueToCompareTo && comparableValue < valueToCompareTo) {
          isValid = false;
        }
      } else {
        if (
          this.value !== undefined &&
          this.valueToCompareTo !== undefined &&
          this.value > this.valueToCompareTo
        ) {
          isValid = false;
        }
      }
    }
    if (
      this.value !== undefined &&
      this.valueToCompareTo !== undefined &&
      this.value > this.valueToCompareTo
    ) {
      isValid = false;
    }

    return {
      isValid,
      errorMessage: isValid ? '' : this.errorMessage,
      properties: this.properties as any,
    };
  }
}
