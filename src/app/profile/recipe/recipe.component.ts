import * as R from 'ramda';

import { Component, OnInit, Inject } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe, recipesQuery, AppConfig, recipesConnectionQuery, recipesConnectionQueryVariables, PageInfoFragmentFragment } from '../../model';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { QueryRef } from 'apollo-angular';
import { AppConfigToken } from '../../app.config';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipesQuery: QueryRef<recipesConnectionQuery, recipesConnectionQueryVariables>;
  recipes$: Observable<Recipe[]>;
  pageInfo: PageInfoFragmentFragment;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(AppConfigToken) private appConfig: AppConfig
  ) { }

  ngOnInit() {
    this.recipesQuery = this.recipeService.recipesConnection({
      ...this.appConfig.pagination
    });

    this.recipes$ = this.recipesQuery.valueChanges.pipe(
      filter(result => !result.loading),
      map(result => {
        const { edges, pageInfo } = result.data.recipesConnection;

        this.pageInfo = pageInfo;

        return R.map(R.prop('node'), edges) as Recipe[];
      })
    );
  }

  loadMore() {
    this.recipeService.recipesFetchMore(this.recipesQuery, this.pageInfo.endCursor);
  }

  create() {
    // 创建菜单
    this.router.navigate(['../create'], { relativeTo: this.route });
  }
}
