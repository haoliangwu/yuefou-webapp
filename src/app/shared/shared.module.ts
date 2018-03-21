import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';

import { MaterialModule, DialogModule } from './modules';
import { FormUtilService, LocationUtilService, RouterUtilService } from './services';
import { PageNotFoundComponent } from './comps';
import { EnterKeyDirective, FullDirective } from './dires';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    EnterKeyDirective,
    FullDirective
  ],
  exports: [
    // base
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // modules
    NgxErrorsModule,
    MaterialModule,
    DialogModule,
    TranslateModule,
    ClipboardModule,
    // directives
    EnterKeyDirective,
    FullDirective
    // comps
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      // services
      providers: [
        FormUtilService,
        LocationUtilService,
        RouterUtilService
      ]
    };
  }
}
