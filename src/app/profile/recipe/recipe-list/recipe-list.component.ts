import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../model';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogUtilService } from '../../../shared/modules/dialog/dialog.service';
import { RecipeService } from '../services/recipe.service';
import { TranslateService } from '@ngx-translate/core';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Input() recipes: Recipe[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogUtil: DialogUtilService,
    private recipeService: RecipeService,
    private translate: TranslateService,
    private toastService: ToastrService,
  ) { }

  ngOnInit() {
  }

  update(recipe: Recipe) {
    this.router.navigate(['../update/:id', { id: recipe.id }], { relativeTo: this.route });
  }

  delete(recipe: Recipe) {
    const dialogRef = this.dialogUtil.confirm({
      data: {
        title: '确定要删除该菜谱？'
      }
    });

    dialogRef.afterClosed().pipe(
      filter(e => !!e),
      switchMap(() => this.recipeService.delete(recipe.id)),
      tap(() => {
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.BASE'));
      })
    ).subscribe();
  }

  share(recipe: Recipe) {
    this.recipeService.share(recipe);
  }
}
