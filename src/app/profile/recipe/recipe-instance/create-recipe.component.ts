import * as R from 'ramda';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RecipeTag, UpdateOperation, UpdateOperationPayload, Recipe } from '../../../model';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
import { publish, refCount, map, tap, publishBehavior, mapTo, debounceTime, filter, switchMap } from 'rxjs/operators';
import { FormUtilService } from '../../../shared/services';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/observable/merge';
import { DialogUtilService } from '../../../shared/modules/dialog/dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent implements OnInit {
  recipe$: Observable<Recipe>;
  recipeTags$: Observable<RecipeTag[]>;
  isDetail$: Observable<boolean>;
  updated$: Observable<boolean>;
  titleText$: Observable<string>;
  reset$ = new Subject();
  taskUpdate$ = new Subject();

  url: string;
  form: FormGroup;
  recipe: Recipe;

  removable = true;
  selectable = true;
  addOnBlur = true;

  get tagsFGs() {
    return this.recipe.tags.map(tag => this.fb.control(tag));
  }

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private formUtil: FormUtilService,
    private dialogUtil: DialogUtilService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      tags: this.fb.array([]),
      time: [0],
      desc: ['']
    });

    this.recipe$ = this.route.data.pipe(
      map(resolve => resolve.recipe),
      tap(recipe => {
        this.recipe = recipe;

        if (this.recipe) {
          this.form.patchValue(this.recipe);
          this.form.setControl('tags', this.fb.array(this.tagsFGs));
        }
      }),
      publishBehavior(null),
      refCount()
    );

    this.recipeTags$ = this.route.data.pipe(
      map(resolve => resolve.recipeTags)
    );

    this.titleText$ = this.recipe$.pipe(
      map(recipe => !!recipe ? 'RECIPE.UPDATE' : 'RECIPE.CREATE')
    );

    this.isDetail$ = this.recipe$.pipe(map(activity => !!activity));

    const updateOn$ = merge(this.form.valueChanges, this.taskUpdate$).pipe(
      mapTo(true)
    );
    const updateOff$ = this.reset$.pipe(
      mapTo(false)
    );

    this.updated$ = merge(updateOn$, updateOff$)
      .pipe(
        debounceTime(100),
        publish(),
        refCount()
      );
  }

  actionReqset(action: UpdateOperationPayload) {
    switch (action.operation) {
      case UpdateOperation.SAVE:
        this.save();
        return;
      case UpdateOperation.CANCEL:
        this.cancel();
        return;
      case UpdateOperation.DELETE:
        this.delete(action.data as Recipe);
        return;
    }
  }

  snapshot(url: string) {
    console.log(url);
    this.url = url;
  }

  private save() {
    this.formUtil.validateAllFormFields(this.form);

    if (this.form.invalid) {
      return;
    }

    if (this.recipe) {
      this.update(this.recipe.id);
    } else {
      this.create();
    }
  }

  private cancel() {
    if (this.recipe) {
      const { name, desc, time } = this.recipe;

      this.form.reset({ name, desc, time });
      this.form.setControl('tags', this.fb.array(this.tagsFGs));
    } else {
      // reset to default
      this.formUtil.resetFormGroup(this.form);
      this.formUtil.clearFormArrayControl(this.form.get('tags') as FormArray);
    }

    this.reset$.next();
  }

  private delete(recipe: Recipe) {
    const dialogRef = this.dialogUtil.confirm({
      data: {
        message: '确定要删除该菜谱？'
      }
    });

    dialogRef.afterClosed().pipe(
      filter(e => !!e),
      // switchMap(() => this.activityService.delete(activity.id)),
      tap(() => {
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.BASE'));
        this.redirect();
      })
    ).subscribe();
  }

  private create() {
    const formRawValue = this.form.value;

    console.log(formRawValue);
  }

  private update(id: string) {
    const formRawValue = this.form.value;

    console.log(formRawValue);
  }

  private redirect() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
