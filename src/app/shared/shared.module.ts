import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';

import { MaterialModule, DialogModule } from './modules';
import { FormUtilService, LocationUtilService, RouterUtilService } from './services';
import { FixedToggleComponent, PageNotFoundComponent } from './comps';
import { EnterKeyDirective, FullDirective } from './dires';
import { ApolloModule } from 'apollo-angular';
import { LoadMoreComponent } from './comps/load-more/load-more.component';
import { ExpandedPanelStepperComponent } from './comps/expanded-panel-stepper/expanded-panel-stepper.component';

@NgModule({
  declarations: [
    EnterKeyDirective,
    FullDirective,
    FixedToggleComponent,
    PageNotFoundComponent,
    LoadMoreComponent,
    ExpandedPanelStepperComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
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
    ApolloModule,
    DialogModule,
    TranslateModule,
    ClipboardModule,
    // directives
    EnterKeyDirective,
    FullDirective,
    // comps
    FixedToggleComponent,
    PageNotFoundComponent,
    LoadMoreComponent,
    ExpandedPanelStepperComponent
    // pipes
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
