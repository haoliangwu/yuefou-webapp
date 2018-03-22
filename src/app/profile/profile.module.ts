import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'ngx-avatar';

import { ProfileRoutingModule } from './profile-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ActivityModule } from './activity/activity.module';
import { TaskModule } from './task/task.module';

import { ProfileComponent } from './profile.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigatorComponent } from './layout/navigator.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ToolbarComponent } from './layout/toolbar.component';
import { RecipeComponent } from './recipe/recipe.component';
import { UserService } from './user-info/user.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ActivityModule,
    TaskModule,
    ProfileRoutingModule,
    AvatarModule,
  ],
  declarations: [
    ProfileComponent,
    DashboardComponent,
    NavigatorComponent,
    UserInfoComponent,
    ToolbarComponent,
    RecipeComponent,
  ],
  providers: [
    UserService
  ]
})
export class ProfileModule { }
