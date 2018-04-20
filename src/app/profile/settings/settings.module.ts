import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SettingsResolver } from './services/settings-resolver.service';
import { SharedModule } from '../../shared/shared.module';

export const SettingsRoute: Route = {
  path: 'settings',
  children: [
    {
      path: '',
      component: SettingsComponent,
      resolve: {
        me: SettingsResolver
      }
    }
  ]
};

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
    SettingsResolver
  ]
})
export class SettingsModule { }
