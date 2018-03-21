import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ProgressStatus, ActivityType, Activity } from '../../model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { Subscription } from 'apollo-client/util/Observable';
import { mapTo, debounceTime, publishBehavior, refCount, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/observable/merge';
import { FormUtilService } from '../../shared/services';
import { ActivityService } from './activity.service';
import { ToastrService } from 'ngx-toastr';
import { TOAST } from '../../constants';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { TranslateService } from '@ngx-translate/core';

const pickActivityProps = R.pick(['title', 'desc', 'type', 'startedAt', 'endedAt', 'location']);

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent implements OnInit {

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
    private toastService: ToastrService,
    private dialogUtil: DialogUtilService,
    private translate: TranslateService
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
        debounceTime(100),
        publishBehavior(false),
        refCount()
      );
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

  delete(activity: Activity) {
    const dialogRef = this.dialogUtil.confirm({
      data: {
        message: '确定要删除该项活动？'
      }
    });

    dialogRef.afterClosed().pipe(
      switchMap(() => this.activityService.delete(activity.id)),
      tap(() => {
        this.redirect();
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.BASE'));
      })
    ).subscribe();
  }

  private create() {
    const nextActivity = this.form.getRawValue();

    this.activityService.create(nextActivity)
      .subscribe(activity => {
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.CREATE_SUCCESS'));

        this.redirect();
      });
  }

  private update(id: string) {
    const nextActivity = this.form.getRawValue();

    this.activityService.update(id, nextActivity)
      .subscribe(activity => {
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.UPDATE_SUCCESS'));

        this.redirect();
      });
  }

  private redirect() {
    this.router.navigate(['/profile/activity/list']);
  }
}
