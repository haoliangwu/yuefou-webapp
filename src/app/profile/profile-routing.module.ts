import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityComponent } from './activity/activity.component';
import { TaskComponent } from './task/task.component';
import { RecipeComponent } from './recipe/recipe.component';

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
        path: 'task',
        component: TaskComponent
      },
      {
        path: 'recipe',
        component: RecipeComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }
