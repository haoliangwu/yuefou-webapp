import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolbarService } from '../../layout/toolbar.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../model';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-instance',
  templateUrl: './recipe-instance.component.html',
  styleUrls: ['./recipe-instance.component.scss']
})
export class RecipeInstanceComponent implements OnInit, OnDestroy {

  recipeSub$: Subscription;

  recipe: Recipe;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipeSub$ = this.route.data.pipe(
      map(resolve => resolve.recipe as Recipe),
      tap(recipe => {
        this.recipe = recipe;
      })
    ).subscribe();
  }

  ngOnDestroy() {
  }

  voteup(recipe: Recipe) {

  }

  votedown(recipe: Recipe) {

  }

  share() {

  }

}
