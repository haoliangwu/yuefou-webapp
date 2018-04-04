import * as R from 'ramda';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RecipeTag, UpdateOperation, UpdateOperationPayload, Recipe } from '../../../model';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
import { publish, refCount, map, tap, publishBehavior, mapTo, debounceTime } from 'rxjs/operators';
import { FormUtilService } from '../../../shared/services';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent implements OnInit {
  recipe$: Observable<Recipe>;
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

  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  set tags(fa: FormArray) {
    this.form.setControl('tags', fa);
  }

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private formUtil: FormUtilService
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
      tap(recipe => this.recipe = recipe),
      publishBehavior(null),
      refCount()
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

  addTagRequest(name: string) {
    const { controls } = this.tags;

    this.tags = this.fb.array([...controls, { name }]);
  }

  deleteTagRequest(idx: number) {
    const { controls } = this.tags;

    this.tags = this.fb.array(R.remove(idx, 1, controls));
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
      //   const resetActivity: Activity = pickActivityProps(this.activity);

      //   // reset basic info
      //   this.form.reset(resetActivity);
      //   // reset tasks

      //   this.tasks = resetActivity.tasks;
    } else {
      // reset to default
      const tagsFa = this.form.get('tags') as FormArray;

      this.formUtil.resetFormGroup(this.form);
    }

    this.reset$.next();
  }

  private delete(recipe: Recipe) {

  }

  private create() {

  }

  private update(id: string) {

  }

  private redirect() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
