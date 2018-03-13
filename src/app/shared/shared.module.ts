import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    // base
    CommonModule,
    ReactiveFormsModule,
    // material
    MaterialModule,
    // form-errors
    NgxErrorsModule
  ]
})
export class SharedModule { }
