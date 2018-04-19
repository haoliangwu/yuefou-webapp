import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { AvatarModule } from 'ngx-avatar';

import { MaterialModule, DialogModule } from './modules';
import { FormUtilService, LocationUtilService, RouterUtilService, FileReaderService, UpdatedStatusGuard, UserService, CosSdkService, ConfigService } from './services';
import { FixedToggleComponent, PageNotFoundComponent, CustomMatSliderComponent, CameraTriggerCardComponent, UpdatePageToolbarComponent, ToolbarComponent, NavigatorComponent } from './comps';
import { EnterKeyDirective, FullDirective } from './dires';
import { ApolloModule } from 'apollo-angular';
import { LoadMoreComponent } from './comps/load-more/load-more.component';
import { ExpandedPanelStepperComponent } from './comps/expanded-panel-stepper/expanded-panel-stepper.component';
import { SafeUrlPipe, SafeResourceUrlPipe } from './pipes/safe-url.pipe';
import { TagService } from './services/tag.service';
import { RecipeFilePrefixPipe } from './pipes/recipe-file-prefix.pipe';
import { TimeReadablePipe } from './pipes/time-readable.pipe';
import { UserInfoComponent } from './comps/user-info/user-info.component';
import { RouterModule } from '@angular/router';
import { CosConfigProvider } from '../model/inject';

@NgModule({
  declarations: [
    EnterKeyDirective,
    FullDirective,
    FixedToggleComponent,
    PageNotFoundComponent,
    LoadMoreComponent,
    ExpandedPanelStepperComponent,
    CustomMatSliderComponent,
    CameraTriggerCardComponent,
    SafeUrlPipe,
    SafeResourceUrlPipe,
    UpdatePageToolbarComponent,
    RecipeFilePrefixPipe,
    TimeReadablePipe,
    ToolbarComponent,
    NavigatorComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    AvatarModule
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
    AvatarModule,
    // directives
    EnterKeyDirective,
    FullDirective,
    // comps
    FixedToggleComponent,
    PageNotFoundComponent,
    LoadMoreComponent,
    ExpandedPanelStepperComponent,
    CustomMatSliderComponent,
    CameraTriggerCardComponent,
    UpdatePageToolbarComponent,
    ToolbarComponent,
    NavigatorComponent,
    UserInfoComponent,
    // pipes
    SafeUrlPipe,
    SafeResourceUrlPipe,
    RecipeFilePrefixPipe,
    TimeReadablePipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      // services
      providers: [
        // utils
        FormUtilService,
        LocationUtilService,
        RouterUtilService,
        FileReaderService,
        // api
        TagService,
        UserService,
        CosSdkService,
        ConfigService,
        // guard
        UpdatedStatusGuard,
        // token
        CosConfigProvider
      ]
    };
  }
}
