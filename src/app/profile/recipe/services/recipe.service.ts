import { Injectable } from '@angular/core';
import { Recipe } from '../../../model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RecipeService {

  constructor() { }

  recipes(): Observable<Recipe[]> {
    return of([
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
    ]);
  }

}
