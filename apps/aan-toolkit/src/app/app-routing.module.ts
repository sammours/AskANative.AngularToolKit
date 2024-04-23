import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'store' },
      {
        path: 'store',
        loadChildren: () =>
          import('./store-test/store-test.module').then(
            (m) => m.StoreTestModule
          ),
      },
      {
        path: 'validation',
        loadChildren: () =>
          import('./validation-test/validation-test.module').then(
            (m) => m.ValidationTestModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
