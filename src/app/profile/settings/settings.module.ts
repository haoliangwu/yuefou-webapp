import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';
import { SettingsComponent } from './settings.component';

export const SettingsRoute: Route = {
  path: 'settings',
  children: [
    {
      path: '',
      component: SettingsComponent
    }
  ]
};

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }
