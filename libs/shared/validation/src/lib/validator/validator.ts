import { BaseValidator } from './base.validator';
import {
  ValidationRule,
  ValidatorState,
} from '../model/validation-result.model';

export class Validator<
  TValidationObject extends Record<string, any>
> extends BaseValidator<TValidationObject> {
  /**
   * This is a function providing specific rules for a validator.
   */
  protected getRules: (
    object: TValidationObject
  ) => Array<ValidationRule<TValidationObject>>;

  constructor(
    getRules: (
      object: TValidationObject
    ) => Array<ValidationRule<TValidationObject>>
  ) {
    super();
    this.getRules = getRules;
  }

  public validate(
    object: TValidationObject
  ): ValidatorState<TValidationObject> {
    return super.validate(object);
  }

  public initialize(
    object: TValidationObject
  ): ValidatorState<TValidationObject> {
    return super.initialize(object);
  }
}

export class ItfmValidatorWithAdditionalValues<
  TValidationObject extends Record<string, any>,
  TAdditionalValues extends Record<string, any>
> extends BaseValidator<TValidationObject> {
  /**
   * This is a function providing specific rules for a validator.
   */
  protected getRules: (
    object: TValidationObject,
    additionalValues: TAdditionalValues
  ) => Array<ValidationRule<TValidationObject>>;

  constructor(
    getRules: (
      object: TValidationObject,
      additionalValues: TAdditionalValues
    ) => Array<ValidationRule<TValidationObject>>
  ) {
    super();
    this.getRules = getRules;
  }

  public validate(
    object: TValidationObject,
    additionalValues: TAdditionalValues
  ): ValidatorState<TValidationObject> {
    return super.validate(object, additionalValues);
  }

  public initialize(
    object: TValidationObject,
    additionalValues: TAdditionalValues
  ): ValidatorState<TValidationObject> {
    return super.initialize(object, additionalValues);
  }
}
