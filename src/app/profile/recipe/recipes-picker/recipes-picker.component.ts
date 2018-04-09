import * as R from 'ramda';

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Recipe, UpdateMeta } from '../../../model';
import { MatSelectionList, MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';
import { FormControl, FormBuilder } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Observable } from 'rxjs/Observable';
import { map, tap, startWith, filter, distinctUntilChanged, debounce, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { uniqById, appendItemAndUniqById, findIndexById, removeItemById } from '../../../utils';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-recipes-picker',
  templateUrl: './recipes-picker.component.html',
  styleUrls: ['./recipes-picker.component.scss']
})
export class RecipesPickerComponent implements OnInit, AfterViewInit {
  @Input() recipes: Recipe[];
  @Output() recipesChange = new EventEmitter<Recipe[]>();

  @Input() isDetail = false;

  @Input() recipesMeta: UpdateMeta<Recipe>;
  @Output() recipesMetaChange = new EventEmitter<UpdateMeta<Recipe>>();

  @ViewChild('recipesList') recipesListComp: MatSelectionList;
  @ViewChild('auto') autoComp: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

  newRecipe: FormControl = this.fb.control('');

  recipeOptions: Observable<Recipe[]>;

  autoSub: Subscription;

  filteredOptions: Observable<Recipe[]>;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.recipesMeta = R.defaultTo<UpdateMeta<Recipe>, UpdateMeta<Recipe>>({
      connect: [],
      disconnect: []
    }, this.recipesMeta);

    // TODO 当前为列出所有的菜谱，之后应当改成按关键字搜索
    const recipes$: Observable<Recipe[]> = this.recipeService.recipes().pipe(
      map(e => e.data.recipes)
    );

    const autoInputValue$: Observable<string> = this.newRecipe.valueChanges
      .pipe(
        debounceTime(200),
        startWith<string | Recipe>(''),
        distinctUntilChanged(),
        map(value => typeof value === 'string' ? value : value.name)
      );

    this.recipeOptions = combineLatest(recipes$, autoInputValue$).pipe(
      map(this.filterRecipeOptions.bind(this))
    );
  }

  ngAfterViewInit() {
    this.autoSub = this.autoComp.optionSelected.pipe(
      map((e: MatAutocompleteSelectedEvent) => e.option.value),
      tap(this.add.bind(this))
    ).subscribe();
  }

  add(recipe: Recipe) {
    this.recipes = appendItemAndUniqById(recipe, this.recipes);

    this.recipesChange.next(this.recipes);

    this.newRecipe.reset('');

    // 输入后自动打开 autoPanel
    // setTimeout(() => {
    //   if (this.autoComp.showPanel) {
    //     this.autoTrigger.openPanel();
    //   }
    // }, 100);

    const { connect, disconnect } = this.recipesMeta;

    this.recipesMeta.connect = appendItemAndUniqById(recipe, connect);

    this.recipesMetaChange.next(this.recipesMeta);
  }

  remove(recipe: Recipe) {
    this.recipes = removeItemById(recipe, this.recipes);

    this.recipesChange.next(this.recipes);

    const { connect, disconnect } = this.recipesMeta;

    this.recipesMeta.connect = removeItemById(recipe, connect);

    if (this.isDetail) {
      this.recipesMeta.disconnect = appendItemAndUniqById(recipe, disconnect);
    }

    this.recipesMetaChange.next(this.recipesMeta);
  }

  autoDisplayFn(recipe?: Recipe): string | void {
    return recipe ? recipe.name : undefined;
  }

  private filterRecipeOptions(args: [Recipe[], string]) {
    const [recipes, keyword] = args;

    if (!keyword) {
      return [];
    }


    const filterByKeyword = R.filter((recipe: Recipe) => recipe.name.toLowerCase().indexOf(keyword.toLocaleLowerCase()) > -1);

    return R.differenceWith((a, b) => a.id === b.id, filterByKeyword(recipes), this.recipes);
  }
}
