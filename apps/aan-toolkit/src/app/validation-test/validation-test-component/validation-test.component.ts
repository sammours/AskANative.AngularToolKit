import { Component } from '@angular/core';

import { Student } from '../student.model';
import { StudentValidator } from '../student.validator';

@Component({
  selector: 'askanative-angulartoolkit-validation-test',
  templateUrl: './validation-test.component.html',
  styleUrls: ['./validation-test.component.scss'],
})
export class ValidationTestComponent {
  public student: Student;
  public student2: Student;
  public student3: Student;
  public validator = new StudentValidator();
  public validator2 = new StudentValidator();
  public validator3 = new StudentValidator();

  constructor() {
    this.student = new Student();
    this.student2 = new Student();
    this.student3 = new Student();
    this.student3.id = '1';
    this.student3.name = 'Student 1';
    this.student3.age = 22;
    this.validator.initialize(this.student);
    this.validator2.initialize(this.student2);
    this.validator3.initialize(this.student3);
  }

  public onBlur() {
    this.validator.validate(this.student);
  }

  public onClicked() {
    this.validator2.validate(this.student2);
  }

  public onChanged() {
    this.validator3.validate(this.student3);
  }
}
