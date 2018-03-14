import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './comps/page-not-found/page-not-found.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { FormUtilService } from './services/form-util.service';
import { EnterKeyDirective } from './dires/enter-key.directive';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    EnterKeyDirective
  ],
  exports: [
    // base
    CommonModule,
    ReactiveFormsModule,
    // material
    MaterialModule,
    // form-errors
    NgxErrorsModule,
    // directives
    EnterKeyDirective
    // comps
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [FormUtilService]
    };
  }
}
