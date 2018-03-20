import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ProgressStatus, ActivityType, Activity } from '../../model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { Subscription } from 'apollo-client/util/Observable';
import { mapTo, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/observable/merge';
import { FormUtilService } from '../../shared/services';
import { ActivityService } from '../services/activity.service';
import { ToastrService } from 'ngx-toastr';
import { TOAST } from '../../constants';

const pickActivityProps = R.pick(['title', 'desc', 'type', 'startedAt', 'endedAt', 'location']);

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent implements OnInit, OnDestroy {

  now = new Date();
  form: FormGroup;
  activity: Activity;
  update$: Observable<boolean>;
  reset$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formUtil: FormUtilService,
    private activityService: ActivityService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: '',
      desc: '',
      type: ActivityType.HOST,
      startedAt: null,
      endedAt: null,
      location: ''
    });

    this.route.data.subscribe((resolve) => {
      this.activity = resolve.activity;

      if (this.activity) {
        this.form.reset(pickActivityProps(resolve.activity));

        // 无法更改活动的类型
        this.form.get('type').disable();
      }
    });

    this.update$ = merge(
      this.form.valueChanges.pipe(mapTo(true)),
      this.reset$.pipe(mapTo(false))).pipe(
        debounceTime(100)
      );
  }

  ngOnDestroy() {
  }

  save() {
    this.formUtil.validateAllFormFields(this.form);

    if (this.form.invalid) {
      return;
    }

    if (this.activity) {
      this.update(this.activity.id);
    } else {
      this.create();
    }
  }

  cancel() {
    if (this.activity) {
      const resetActivity = pickActivityProps(this.activity);

      this.form.reset(resetActivity);
    } else {
      this.form.reset();
    }

    this.reset$.next();
  }

  private create() {
    const nextActivity = this.form.getRawValue();

    this.activityService.create(nextActivity)
      .subscribe(activity => {
        this.toastService.success(TOAST.SUCCESS.CREATE_ACTIVITY);

        this.router.navigate(['/profile/activity/list']);
      });
  }

  private update(id: string) {
    const nextActivity = this.form.getRawValue();

    this.activityService.update(id, nextActivity)
      .subscribe(activity => {
        this.toastService.success(TOAST.SUCCESS.UPDATE_ACTIVITY);

        this.router.navigate(['/profile/activity/list']);
      });
  }

  // validateIsInvalidDate(control: AbstractControl) {
  //   const d: Date = control.value;

  //   if (Object.prototype.toString.call(d) === '[object Date]') {
  //     if (isNaN(d.getTime())) {
  //       return { invalid: true };
  //     } else {
  //       return null;
  //     }
  //   } else {
  //     return { invalid: true };
  //   }
  // }
}
