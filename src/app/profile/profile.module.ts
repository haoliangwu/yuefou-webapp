import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'ngx-avatar';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigatorComponent } from './layout/navigator.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ToolbarComponent } from './layout/toolbar.component';
import { ActivityComponent } from './activity/activity.component';
import { TaskComponent } from './task/task.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ActivityService } from './services/activity.service';
import { UserService } from './services/user.service';
import { ActivityDetailComponent } from './activity/activity-detail.component';
import { FixedToggleComponent } from './layout/fixed-toggle/fixed-toggle.component';
import { ActivityCreateComponent } from './activity/activity-create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    AvatarModule
  ],
  declarations: [
    ProfileComponent,
    DashboardComponent,
    NavigatorComponent,
    UserInfoComponent,
    ToolbarComponent,
    ActivityComponent,
    ActivityDetailComponent,
    TaskComponent,
    RecipeComponent,
    FixedToggleComponent,
    ActivityCreateComponent],
  providers: [
    ActivityService,
    UserService
  ]
})
export class ProfileModule { }
