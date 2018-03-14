import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { FormUtilService } from './services/form-util.service';

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
  ],
  providers: [FormUtilService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
