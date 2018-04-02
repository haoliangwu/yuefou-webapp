import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Input() recipes: Recipe[];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  update(recipe: Recipe) {
    this.router.navigate(['../update/:id', { id: recipe.id }], {relativeTo: this.route});
  }

}
