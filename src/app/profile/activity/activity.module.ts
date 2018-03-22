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

export const ActivityRoute: Route = {
  path: 'activity',
  children: [
    {
      path: 'list',
      component: ActivityComponent
    },
    {
      path: 'create',
      component: ActivityCreateComponent
    },
    {
      path: 'update/:id',
      component: ActivityCreateComponent,
      resolve: {
        activity: ActivityResolver
      }
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
    SharedModule
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
