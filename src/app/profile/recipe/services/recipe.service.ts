import { Injectable } from '@angular/core';
import { Recipe, RecipeTag, RecipeTagType } from '../../../model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

const mockRecipes = [
  {
    id: '1',
    name: 'foo',
    desc: '',
    time: 5,
    tags: [
      {
        id: '1',
        name: '甜',
        type: RecipeTagType.TASTE
      },
      {
        id: '2',
        name: '酸',
        type: RecipeTagType.TASTE
      },
      {
        id: '3',
        name: '辣',
        type: RecipeTagType.TASTE
      }
    ]
  },
  {
    id: '2',
    name: 'bar',
    desc: '',
    time: 10,
    tags: []
  },
  {
    id: '3',
    name: 'baz',
    desc: '',
    time: 15,
    tags: []
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

  recipeTags(): Observable<RecipeTag[]> {
    return of([
      {
        id: '1',
        name: '甜',
        type: RecipeTagType.TASTE
      },
      {
        id: '2',
        name: '酸',
        type: RecipeTagType.TASTE
      },
      {
        id: '3',
        name: '辣',
        type: RecipeTagType.TASTE
      }
    ]);
  }

}
