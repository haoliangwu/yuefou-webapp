import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class EagerInvalidMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Injectable()
export class FormUtilService {

  constructor() { }

  get eagerInvalidMatcher() {
    return new EagerInvalidMatcher();
  }

  /*
   trigger all formControl validators
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /*
   reset the FormGroup
   */
  resetFormGroup(formGroup: FormGroup, withFormArray = false) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.reset();
      } else if (control instanceof FormGroup) {
        this.resetFormGroup(control);
      } else if (control instanceof FormArray && withFormArray) {
        this.resetFormArrayControl(control);
      }
    });
  }

  /*
  reset the FormArray
   */
  resetFormArrayControl(formArray: FormArray) {
    formArray.controls.forEach(control => control.reset());
  }

  /*
  clear the FormArray
   */
  clearFormArrayControl(formArray: FormArray) {
    while (formArray.controls.length) {
      formArray.removeAt(0);
    }
  }

}
