import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity.component';
import { ActivityDetailComponent } from './activity-detail.component';
import { ActivityCreateComponent } from './activity-create.component';
import { ActivityService } from './activity.service';
import { SharedModule } from '../../shared/shared.module';
import { ActivityResolver } from './activity-resolver.service';
import { Route } from '@angular/router';
import { ActivityPermissionPipe } from './pipes/activity-permission.pipe';
import { TaskModule } from '../task/task.module';
import { RecipeModule } from '../recipe/recipe.module';
import { UpdatedStatusGuard } from '../../shared/services';

export const ActivityRoute: Route = {
  path: 'activity',
  children: [
    {
      path: 'list',
      component: ActivityComponent
    },
    {
      path: 'create',
      component: ActivityCreateComponent,
      canDeactivate: [UpdatedStatusGuard]
    },
    {
      path: 'update/:id',
      component: ActivityCreateComponent,
      resolve: {
        activity: ActivityResolver
      },
      canDeactivate: [UpdatedStatusGuard]
    },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
  ]
};

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaskModule,
    RecipeModule
  ],
  declarations: [
    ActivityComponent,
    ActivityDetailComponent,
    ActivityCreateComponent,
    ActivityPermissionPipe,
  ],
  providers: [
    ActivityService,
    ActivityResolver
  ],
  exports: [
    ActivityPermissionPipe
  ]
})
export class ActivityModule { }
