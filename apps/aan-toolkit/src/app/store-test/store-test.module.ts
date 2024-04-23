import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedStoreModule } from '@askanative-angulartoolkit/shared/store';

import { StoreTestComponent } from './store-test-component/store-test.component';
import { reducers, metaReducers, runtimeChecks } from './state';
import { MovieEffects } from './effects/movie.effect';
import { StoreTestRoutingModule } from './store-test-routing.module';

@NgModule({
  declarations: [StoreTestComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreTestRoutingModule,
    SharedStoreModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: runtimeChecks,
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([MovieEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
      serialize: undefined,
    }),
  ],
  providers: [],
})
export class StoreTestModule {}
