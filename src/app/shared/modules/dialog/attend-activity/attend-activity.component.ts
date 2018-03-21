import { Component, OnInit } from '@angular/core';
import { NgModel, FormControl, AsyncValidatorFn, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { FormUtilService } from '../../../services';
import { ActivityService } from '../../../../profile/activity/activity.service';
import { debounceTime, distinctUntilChanged, map, switchMap, delay } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-attend-activity',
  templateUrl: './attend-activity.component.html',
  styleUrls: ['./attend-activity.component.scss']
})
export class AttendActivityComponent implements OnInit {
  form: FormGroup = new FormGroup({
    code: new FormControl('', [
      Validators.required,
    ], [
        this.validateCode.bind(this)
      ])
  });

  constructor(
    private dialogRef: MatDialogRef<AttendActivityComponent>,
    public formUtil: FormUtilService,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
  }

  attend() {
    this.formUtil.validateAllFormFields(this.form);

    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close();
  }

  validateCode(control: AbstractControl) {
    const validate = val => this.activityService.activity(val).pipe(
      map(activity => {
        if (!activity) {
          return { unExist: true };
        } else {
          return null;
        }
      })
    );

    return of(control.value).pipe(
      delay(350),
      switchMap(validate)
    );
  }

}
