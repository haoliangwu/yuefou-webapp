import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Recipe } from '../../../model';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from './recipe.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RecipeResolver {

  constructor(
    private recipeService: RecipeService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
    return this.recipeService.recipe(route.params.id);
  }

}
