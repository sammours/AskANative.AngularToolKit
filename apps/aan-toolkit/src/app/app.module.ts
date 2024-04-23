import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedCommonModule } from '@askanative-angulartoolkit/shared/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedStoreModule } from '@askanative-angulartoolkit/shared/store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    SharedCommonModule,
    SharedStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
