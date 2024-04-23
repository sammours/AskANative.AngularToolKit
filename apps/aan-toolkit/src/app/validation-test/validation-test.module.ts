import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ValidationTestRoutingModule } from './validation-test-routing.module';

import { ValidationTestComponent } from './validation-test-component/validation-test.component';

@NgModule({
  declarations: [ValidationTestComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ValidationTestRoutingModule,
  ],
  providers: [],
})
export class ValidationTestModule {}
