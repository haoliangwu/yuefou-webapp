import { Injectable } from '@angular/core';
import { Recipe } from '../../../model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

const mockRecipes = [
  {
    id: '1',
    name: 'foo'
  },
  {
    id: '2',
    name: 'bar'
  },
  {
    id: '3',
    name: 'baz'
  }
];

@Injectable()
export class RecipeService {

  constructor() { }

  recipes(): Observable<Recipe[]> {
    return of(mockRecipes);
  }

  recipe(id: string): Observable<Recipe> {
    return this.recipes().pipe(
      map(recipes => recipes.find(recipe => recipe.id === id))
    );
  }

}
