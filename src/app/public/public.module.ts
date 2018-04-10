import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { ShareComponent } from './share.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityModule } from '../profile/activity/activity.module';
import { TaskModule } from '../profile/task/task.module';
import { RecipeModule } from '../profile/recipe/recipe.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ActivityModule,
    TaskModule,
    RecipeModule,
    PublicRoutingModule
  ],
  declarations: [
    ShareComponent
  ]
})
export class PublicModule { }
