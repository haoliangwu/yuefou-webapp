import { Component, OnInit } from '@angular/core';
import { NgModel, FormControl, AsyncValidatorFn, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { FormUtilService } from '../../../services';
import { ActivityService } from '../../../../profile/services/activity.service';
import { map } from 'rxjs/operators';
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
    private formUtil: FormUtilService,
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
    return this.activityService.activity(control.value).pipe(
      map(e => {
        if (e.id > 5) {
          return { unExist: true };
        } else {
          return null;
        }
      })
    );
  }

}
