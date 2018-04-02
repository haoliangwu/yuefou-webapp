import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RecipeComponent } from './recipe.component';
import { Route } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeService } from './services/recipe.service';
import { RecipeInstanceComponent } from './recipe-instance/recipe-instance.component';
import { CreateRecipeComponent } from './recipe-instance/create-recipe.component';
import { RecipeTagFieldComponent } from './recipe-tag-field/recipe-tag-field.component';

export const RecipeRoute: Route = {
  path: 'recipe',
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
    {
      path: 'list',
      component: RecipeComponent,
    },
    {
      path: 'view',
      component: RecipeInstanceComponent
    },
    {
      path: 'create',
      component: CreateRecipeComponent
    },
    {
      path: 'update/:id',
      component: CreateRecipeComponent
    }
  ]
};

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeInstanceComponent,
    CreateRecipeComponent,
    RecipeTagFieldComponent
  ],
  providers: [
    RecipeService
  ],
  exports: [
  ]
})
export class RecipeModule { }
