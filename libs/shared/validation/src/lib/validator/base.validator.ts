import {
  ValidatorState,
  ValidationRule,
  PropertyValidatorResult,
  ObjectValidatorResult,
} from '../model/validation-result.model';
import {
  isNull,
  isUndefined,
  isDate,
  isMoment,
  isPrimitive,
  isArray,
  isObject,
} from '@askanative-angulartoolkit/shared/common';

export abstract class BaseValidator<T extends Record<string, any>> {
  /**
   * The validator state contains a general state of the whole object
   * provided, as well as sub-states for each property ob the object
   * (aswell as potential sub-properties etc.)
   *
   * Property states are easily accessible, f.e.
   * state.props.count.isValid
   */
  public state: ValidatorState<T>;

  constructor() {
    this.state = this.getInitialValidatorResult();
  }

  protected abstract getRules(
    object: T,
    additionalValues?: any
  ): Array<ValidationRule<T>>;

  public validate(object: T, additionalValues?: any): ValidatorState<T> {
    let isValid = true;
    const errorMessages: string[] = [];
    const rules = this.getRules(object, additionalValues);

    // Here, we create an object that mirrors each property key of the original object
    // But contains an initial validation state.
    const objectValidationState = createObjectValidatorPropertiesForItem(
      object
    );

    for (const rule of rules) {
      // We validate each of our rules
      const validationResult = rule.validate();

      // If the result is not valid, our validator-state will be set to invalid.
      // Note that this is independent from wether the rule is linked to any specific properties.
      if (!validationResult.isValid) {
        isValid = false;
        errorMessages.push(validationResult.errorMessage);

        // If the rule is linked to certain properties of our object
        // we see if we can find those properties within our object validation state
        // by using the provided function.
        // If we do, we set our property validation state accordingly.
        for (const linkedProperty of validationResult.properties) {
          const objectProperty = linkedProperty(object);
          if (
            isNull(objectProperty) ||
            isUndefined(objectProperty) ||
            isDate(objectProperty) ||
            isMoment(objectProperty) ||
            isPrimitive(objectProperty)
          ) {
            const currentProperty: PropertyValidatorResult = linkedProperty(
              objectValidationState
            );
            if (currentProperty) {
              currentProperty.isValid = false;
              currentProperty.errors.push(validationResult.errorMessage);
              currentProperty.errorMessage = this.getErrorMessage(
                currentProperty.errors
              );
            }
          }
        }
      }
    }

    const errors = isValid ? [] : errorMessages;
    const errorMessage = errors ? this.getErrorMessage(errors) : '';

    this.state = {
      isValid,
      errors,
      errorMessage,
      props: objectValidationState as ObjectValidatorResult<T>,
      pristine: false,
    };
    return this.state;
  }

  /**
   * This is an optional initialize which validates the object
   * and set the overall state, but does not set the object property state.
   *
   * It can be used f.e. when creating a new object to disable the save button,
   * but not already show error messages.
   */
  public initialize(object: T, additionalValues?: any): ValidatorState<T> {
    let isValid = true;
    const errorMessages: string[] = [];

    const rules = this.getRules(object, additionalValues);

    for (const rule of rules) {
      const validationResult = rule.validate();
      if (!validationResult.isValid) {
        isValid = false;
        errorMessages.push(validationResult.errorMessage);
      }
    }

    const errors = isValid ? [] : errorMessages;
    const errorMessage = errors ? this.getErrorMessage(errors) : '';

    this.state = {
      isValid,
      errors,
      errorMessage,
      props: undefined,
      pristine: true,
    };
    return this.state;
  }

  public reset() {
    this.state = this.getInitialValidatorResult();
  }

  private getErrorMessage(errors: string[]) {
    return errors.join('\n\n');
  }

  private getInitialValidatorResult(): ValidatorState<T> {
    return {
      isValid: true,
      errorMessage: '',
      errors: [],
      props: undefined,
      pristine: true,
    };
  }
}

/**
 * Creates an object that mirrors each property key of the original object.
 *
 * Each nested primitive property somewhere within the tree gets a validation state
 *  instead of it's original content.
 * */

function createObjectValidatorPropertiesForItem<T extends object>(item: T) {
  const objectProperties = {} as Record<keyof T, PropertyValidatorResult | any>;
  for (const propertyKey of Reflect.ownKeys(item)) {
    objectProperties[propertyKey as keyof T] = createObjectValidatorProperties(
      item[propertyKey as keyof T]
    );
  }

  return objectProperties;
}

/**
 * Creates and returns an initial validation state for an object if it's a primitive type.
 *
 * If it's an object, calls the function again for each property.
 *
 * If it's an array, calls the function again for each element.
 *
 * If nothing fits (to prevent endless loops) creates and returns an initial validation state.
 *
 * In the end, returns the initial object where all nested primitive properties
 * somewhere within the tree contain an initial validation state.
 */
function createObjectValidatorProperties<T>(
  item: T
):
  | PropertyValidatorResult
  | Record<keyof T, PropertyValidatorResult | any>
  | any[] {
  if (isPrimitive(item) || isDate(item) || isMoment(item)) {
    return { isValid: true, errors: [], errorMessage: '' };
  }

  if (isArray(item)) {
    const resultArray = [] as any[];
    for (const itemInArray of item) {
      resultArray.push(createObjectValidatorProperties(itemInArray));
    }
    return resultArray;
  }

  if (isObject(item)) {
    const objectProperties = {} as Record<
      keyof T,
      PropertyValidatorResult | any
    >;
    for (const propertyKey of Reflect.ownKeys(item)) {
      objectProperties[
        propertyKey as keyof T
      ] = createObjectValidatorProperties(item[propertyKey as keyof T]);
    }
    return objectProperties;
  }

  return { isValid: true, errors: [], errorMessage: '' };
}
