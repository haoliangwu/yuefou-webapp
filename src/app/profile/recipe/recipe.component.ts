import { Component, OnInit } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../../model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipes$: Observable<Recipe[]>;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipes$ = this.recipeService.recipes();
  }

  create() {
    // 创建菜单
    this.router.navigate(['../create'], {relativeTo: this.route});
  }
}
