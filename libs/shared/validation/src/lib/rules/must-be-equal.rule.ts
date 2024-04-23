import {
  ValidationRule,
  PropertyValidationResult,
} from '../model/validation-result.model';
import { PropertyLink } from '../model/property.model';

export class ValueMustBeEqualRule<T> implements ValidationRule<T> {
  public properties: PropertyLink<T>[];
  public errorMessage = '';
  public value: number | undefined;
  public num: number | undefined;

  constructor(
    value: number | undefined,
    num: number | undefined,
    errorMessage: string,
    properties: PropertyLink<T>[]
  ) {
    this.properties = properties;
    this.value = value;
    this.errorMessage = errorMessage;
    this.num = num;
  }
  public validate(): PropertyValidationResult<T> {
    let isValid = true;
    if (this.value === undefined || this.value !== this.num) {
      isValid = false;
    }

    return {
      isValid,
      errorMessage: isValid ? '' : this.errorMessage,
      properties: this.properties as any,
    };
  }
}
