import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareComponent } from './share.component';
import { RecipeInstanceComponent } from '../profile/recipe/recipe-instance/recipe-instance.component';
import { RecipeResolver } from '../profile/recipe/services/recipe-resolver.service';

const routes: Routes = [
  {
    path: 'share',
    component: ShareComponent,
    children: [
      {
        path: 'recipe/:id',
        component: RecipeInstanceComponent,
        resolve: {
          recipe: RecipeResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
