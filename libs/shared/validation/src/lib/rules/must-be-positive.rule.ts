import { PropertyLink } from '../model/property.model';
import {
  ValidationRule,
  PropertyValidationResult,
} from '../model/validation-result.model';

export class MustBePositiveRule<T> implements ValidationRule<T> {
  public properties: PropertyLink<T>[];
  public errorMessage = '';
  public value: number | undefined;

  constructor(
    value: number | undefined,
    errorMessage: string,
    properties: PropertyLink<T>[]
  ) {
    this.properties = properties;
    this.value = value;
    this.errorMessage = errorMessage;
  }

  public validate(): PropertyValidationResult<T> {
    let isValid = true;
    if (this.value === undefined || this.value < 1) {
      isValid = false;
    }

    return {
      isValid,
      errorMessage: isValid ? '' : this.errorMessage,
      properties: this.properties as any,
    };
  }
}
