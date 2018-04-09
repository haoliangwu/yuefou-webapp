import * as R from 'ramda';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RecipeTag, UpdateOperation, UpdateOperationPayload, Recipe, CreateRecipeInput, TagsMetaInput, TagCategory, updateRecipeMutation } from '../../../model';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
import { publish, refCount, map, tap, publishBehavior, mapTo, debounceTime, filter, switchMap } from 'rxjs/operators';
import { FormUtilService, FileReaderService } from '../../../shared/services';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/observable/merge';
import { DialogUtilService } from '../../../shared/modules/dialog/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../services/recipe.service';
import { isNotExisted, isExisted } from '../../../utils';
import { FetchResult } from 'apollo-link';
import { BaseUpdatedComponent } from '../../../utils/base-updated-component';

const applyRecipeCategory = R.merge(R.__, { category: TagCategory.RECIPE });
const pickTagInputProps = R.pick(['id']);

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent extends BaseUpdatedComponent implements OnInit, OnDestroy {
  recipe$: Observable<Recipe>;
  recipeAvatar$: Observable<string | void>;
  recipeTags$: Observable<RecipeTag[]>;
  isDetail$: Observable<boolean>;
  titleText$: Observable<string>;
  reset$ = new Subject();
  taskUpdate$ = new Subject();
  recipePictureChange$ = new Subject<string>();

  file: File;
  form: FormGroup;
  recipe: Recipe;

  removable = true;
  selectable = true;
  addOnBlur = true;

  get tagsFGs() {
    return this.recipe ? this.recipe.tags.map(tag => this.fb.control(tag)) : [];
  }

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private formUtil: FormUtilService,
    private dialogUtil: DialogUtilService,
    private toastService: ToastrService,
    private fileReader: FileReaderService,
    private recipeService: RecipeService
  ) {
    super();
   }

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

    this.recipeAvatar$ = merge(this.recipe$.pipe(
      filter(recipe => recipe && !!recipe.avatar),
      map(recipe => recipe.avatar),
    ), this.recipePictureChange$);

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

    this.updated$ = merge(updateOn$, updateOff$, this.updated$)
      .pipe(
        debounceTime(100),
        publishBehavior(false),
        refCount()
      );
  }

  ngOnDestroy() {
    this.fileReader.revokeObjectURL();
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

  snapshot(file: File) {
    this.recipePictureChange$.next(this.fileReader.createObjectURL(file));
    this.file = file;
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
      switchMap(() => this.recipeService.delete(recipe.id)),
      tap(() => {
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.BASE'));
        this.redirect();
      })
    ).subscribe();
  }

  private create() {
    const { tags, ...recipe } = this.form.value;

    const tagsMeta: TagsMetaInput = {
      create: R.map(applyRecipeCategory, R.filter(isNotExisted, tags)) as RecipeTag[],
      connect: R.map(pickTagInputProps, R.filter(isExisted, tags)) as RecipeTag[]
    };

    this.recipeService.create(recipe, tagsMeta, ).pipe(
      switchMap(result => this.file ? this.recipeService.uploadRecipePicture(result.data.createRecipe.id, this.file) : of(result)),
      tap(e => {
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.CREATE_SUCCESS'));

        this.redirect();
      })
    ).subscribe();
  }

  private update(id: string) {
    const { tags, ...recipe } = this.form.value;
    const { tags: originTags } = this.recipe;

    const create = R.map(applyRecipeCategory, R.filter(isNotExisted, tags)) as RecipeTag[];
    const dupById = (a, b) => a.id === b.id;
    const connect = R.map(pickTagInputProps, R.differenceWith(dupById, R.filter(isExisted, tags), originTags)) as RecipeTag[];
    const disconnect = R.map(pickTagInputProps, R.differenceWith(dupById, originTags, tags)) as RecipeTag[];

    const tagsMeta: TagsMetaInput = {
      create,
      connect,
      disconnect
    };

    this.recipeService.update({ ...recipe, id }, tagsMeta, ).pipe(
      switchMap(result => this.file ? this.recipeService.uploadRecipePicture(this.recipe.id, this.file) : of(result)),
      tap(e => {
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.UPDATE_SUCCESS'));

        this.redirect();
      })
    ).subscribe();
  }

  private redirect() {
    this.router.navigate([this.recipe ? '../../list' : '../list'], { relativeTo: this.route });
  }
}
