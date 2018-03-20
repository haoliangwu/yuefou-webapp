import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityComponent } from './activity/activity.component';
import { TaskComponent } from './task/task.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ActivityCreateComponent } from './activity/activity-create.component';
import { ActivityDetailComponent } from './activity/activity-detail.component';
import { ActivityResolver } from './activity/activity-resolver.service';

const activityRoute: Route = {
  path: 'activity',
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
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
      component: ActivityCreateComponent
    },
    {
      path: 'detail/:id',
      component: ActivityDetailComponent,
      resolve: {
        activity: ActivityResolver
      }
    }
  ]
};

const taskRoute: Route = {
  path: 'task',
  component: TaskComponent
};

const recipeRoute: Route = {
  path: 'recipe',
  component: RecipeComponent
};

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
      activityRoute,
      taskRoute,
      recipeRoute
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
