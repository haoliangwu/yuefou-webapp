import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityComponent } from './activity/activity.component';
import { TaskComponent } from './task/task.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ActivityCreateComponent } from './activity/activity-create.component';
import { ActivityDetailComponent } from './activity/activity-detail.component';
import { ActivityResolver } from './activity/activity-resolver.service';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'activity',
        component: ActivityComponent
      },
      {
        path: 'activity/create',
        component: ActivityCreateComponent
      },
      {
        path: 'activity/:id',
        component: ActivityDetailComponent,
        resolve: {
          activity: ActivityResolver
        }
      },
      {
        path: 'task',
        component: TaskComponent
      },
      {
        path: 'recipe',
        component: RecipeComponent
      }
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
    ActivityResolver
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }
