import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ActivityModule } from './activity/activity.module';
import { TaskModule } from './task/task.module';

import { ProfileComponent } from './profile.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeModule } from './recipe/recipe.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ActivityModule,
    TaskModule,
    RecipeModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    DashboardComponent
  ]
})
export class ProfileModule { }
