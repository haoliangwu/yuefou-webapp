import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ActivityRoute } from './activity/activity.module';
import { TaskRoute } from './task/task.module';

const RecipeRoute: Route = {
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
        path: 'dashboard',
        component: DashboardComponent
      },
      ActivityRoute,
      TaskRoute,
      RecipeRoute,
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ],
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
