import { Student } from './student.model';
import {
  Validator,
  ValidationRule,
  MustNotBeNullOrEmptyRule,
  MustBeGreaterThanOrEqualRule,
  MustBeLessThanOrEqualRule,
} from '@askanative-angulartoolkit/shared/validation';

export class StudentValidator extends Validator<Student> {
  constructor() {
    super(getRules);
  }
}

function getRules(model: Student) {
  const rules: ValidationRule<Student>[] = [];

  rules.push(
    new MustNotBeNullOrEmptyRule(model.id, 'Id cannot be empty', [(x) => x.id])
  );

  rules.push(
    new MustNotBeNullOrEmptyRule(model.name, 'Name cannot be empty', [
      (x) => x.name,
    ])
  );

  rules.push(
    new MustBeGreaterThanOrEqualRule(
      model.age,
      18,
      'Age must be greater than 18',
      [(x) => x.age]
    )
  );

  rules.push(
    new MustBeLessThanOrEqualRule(model.age, 40, 'Age must be less than 40', [
      (x) => x.age,
    ])
  );

  return rules;
}
