import * as R from 'ramda';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RecipeTag } from '../../../model';

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

  get styleTags() {
    return this.form.get('style') as FormArray;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      style: this.fb.array([]),
      taste: this.fb.array([]),
      method: this.fb.array([])
    });
  }

  addStyleTagRequest(name: string) {
    this.addTagRequest(name, 'style', this.styleTags);
  }

  deleteStyleTagRequest(idx: number) {
    this.deleteTagRequest(idx, 'style', this.styleTags);
  }

  private addTagRequest(name: string, controlName: string, fa: FormArray) {
    const { controls } = fa;

    this.form.setControl(controlName, this.fb.array([...controls, { name }]));
  }

  private deleteTagRequest(idx: number, controlName: string, fa: FormArray) {
    const { controls } = fa;

    this.form.setControl(controlName, this.fb.array(R.remove(idx, 1, controls)));
  }
}
