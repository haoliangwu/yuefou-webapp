import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Recipe, RecipeTag } from '../../../model';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from './recipe.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipeResolver {

  constructor(
    private recipeService: RecipeService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
    return this.recipeService.recipe(route.params.id).pipe(
      map(e => e.data.recipe)
    );
  }

}

@Injectable()
export class RecipeTagsResolver {
  constructor(
    private recipeService: RecipeService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RecipeTag[] | Observable<RecipeTag[]> | Promise<RecipeTag[]> {
    return this.recipeService.recipeTags().pipe(
      map(e => e.data.tags)
    );
  }
}
