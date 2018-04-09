import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { NgModel, FormControl, AsyncValidatorFn, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { FormUtilService } from '../../../services/form-util.service';
import { ActivityService } from '../../../../profile/activity/activity.service';
import { debounceTime, distinctUntilChanged, map, switchMap, delay } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-attend-activity',
  templateUrl: './attend-activity.component.html',
  styleUrls: ['./attend-activity.component.scss']
})
export class AttendActivityComponent implements OnInit, AfterContentInit {
  form: FormGroup = new FormGroup({
    code: new FormControl('', [
      Validators.required,
    ], [
        this.validateCode.bind(this)
      ])
  });

  @ViewChild('input') $input: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<AttendActivityComponent>,
    public formUtil: FormUtilService,
    private activityService: ActivityService,
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    const el: HTMLInputElement = this.$input.nativeElement;

    el.focus();
  }

  attend() {
    this.formUtil.validateAllFormFields(this.form);

    if (this.form.invalid) {
      return;
    }

    const { value } = this.form.get('code');

    this.dialogRef.close(value);
  }

  validateCode(control: AbstractControl) {
    const validate = val => this.activityService.isActivityExist(val).pipe(
      map(exist => {
        if (exist) {
          return null;
        } else {
          return { unExist: true };
        }
      })
    );

    return of(control.value).pipe(
      delay(350),
      switchMap(validate)
    );
  }

}
