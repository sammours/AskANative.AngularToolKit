import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationTestComponent } from './validation-test-component/validation-test.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ValidationTestComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationTestRoutingModule {}
