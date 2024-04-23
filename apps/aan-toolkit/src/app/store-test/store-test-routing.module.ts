import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreTestComponent } from './store-test-component/store-test.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StoreTestComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreTestRoutingModule {}
