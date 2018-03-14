import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'ngx-avatar';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    AvatarModule
  ],
  declarations: [ProfileComponent, DashboardComponent, NavigatorComponent, UserInfoComponent]
})
export class ProfileModule { }
