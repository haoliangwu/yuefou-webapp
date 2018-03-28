import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivityType, Activity, Task } from '../../model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { Subscription } from 'apollo-client/util/Observable';
import { mapTo, debounceTime, publishBehavior, refCount, switchMap, tap, filter, map, startWith, publish } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { FormUtilService } from '../../shared/services';
import { ActivityService } from './activity.service';
import { ToastrService } from 'ngx-toastr';
import { TOAST } from '../../constants';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';

const pickActivityProps = R.pick(['title', 'desc', 'type', 'startedAt', 'endedAt', 'location']);

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent implements OnInit {
  isDetail$: Observable<boolean>;
  isTaskType$: Observable<boolean>;
  isHostType$: Observable<boolean>;
  minStart$: Observable<Date>;
  initType$: Observable<ActivityType>;
  update$: Observable<boolean>;
  tasks$: Observable<Task[]>;

  expandedHeight = '48px';
  step = 1;

  form: FormGroup;
  activity: Activity;
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
    const defaultForm = {
      title: '',
      desc: '',
      type: ActivityType.HOST,
      startedAt: null,
      endedAt: null,
      location: ''
    };

    this.form = this.fb.group(defaultForm);

    const resolveActivity$: Observable<Activity> = this.route.data.pipe(
      tap((resolve) => {
        this.activity = resolve.activity;

        const typeControl = this.form.get('type');

        if (this.activity) {
          this.form.reset(pickActivityProps(resolve.activity));

          // 无法更改活动的类型
          typeControl.disable();

          this.reset$.next();
        }
      }),
      map(resolve => resolve.activity),
      publishBehavior(null),
      refCount()
    );

    this.tasks$ = resolveActivity$.pipe(
      filter(R.complement(R.isNil)),
      map(activity => activity.tasks),
      filter(R.complement(R.either(R.isNil, R.isEmpty))),
      startWith([])
    );

    this.isDetail$ = resolveActivity$.pipe(map(activity => !!activity));

    this.minStart$ = resolveActivity$.pipe(
      map(activity => activity ? new Date(activity.startedAt) : new Date())
    );

    this.initType$ = resolveActivity$.pipe(
      map(activity => activity ? activity.type : ActivityType.TASK)
    );

    this.isTaskType$ = merge(this.form.get('type').valueChanges, this.initType$).pipe(
      map(type => {
        return R.equals(type, ActivityType.TASK);
      }),
      startWith(true)
    );

    this.isHostType$ = merge(this.form.get('type').valueChanges, this.initType$).pipe(
      map(type => {
        return R.equals(type, ActivityType.HOST);
      }),
      startWith(true)
    );

    this.update$ = merge(this.form.valueChanges.pipe(mapTo(true)), this.reset$.pipe(mapTo(false)))
      .pipe(
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
      filter(e => !!e),
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
