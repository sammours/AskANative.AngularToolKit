import { PropertyLink } from '../model/property.model';
import {
  ValidationRule,
  PropertyValidationResult,
} from '../model/validation-result.model';

export class MustNotBeNullOrEmptyRule<T> implements ValidationRule<T> {
  public properties: PropertyLink<T>[];
  public errorMessage = '';
  public value: string | undefined;

  constructor(
    value: string | undefined,
    errorMessage: string,
    properties: PropertyLink<T>[]
  ) {
    this.value = value;
    this.errorMessage = errorMessage;
    this.properties = properties;
  }

  public validate(): PropertyValidationResult<T> {
    let isValid = true;
    if (this.value == null || this.value === undefined || this.value === '') {
      isValid = false;
    }

    return {
      isValid,
      errorMessage: isValid ? '' : this.errorMessage,
      properties: this.properties as any,
    };
  }
}
