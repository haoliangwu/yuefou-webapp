import * as R from 'ramda';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RecipeTag } from '../../../model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {
  form: FormGroup;

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
    private translate: TranslateService
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      tags: this.fb.array([]),
    });
  }

  addTagRequest(name: string) {
    const { controls } = this.tags;

    this.tags = this.fb.array([...controls, { name }]);
  }

  deleteTagRequest(idx: number) {
    const { controls } = this.tags;

    this.tags = this.fb.array(R.remove(idx, 1, controls));
  }
}
