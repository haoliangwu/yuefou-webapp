import { Component, OnInit, ViewChild, ComponentRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivityType, Activity, Task, UpdateOperationPayload, UpdateOperation, UpdateMeta } from '../../model';
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
import { TasksManageListComponent } from '../task/tasks-manage-list';
import { of } from 'rxjs/observable/of';

const DEFAULT_ACTIVITY_FORM = {
  title: '',
  desc: '',
  type: ActivityType.TASK,
  startedAt: null,
  endedAt: null,
  location: ''
};

const pickActivityProps = R.pick(['title', 'desc', 'type', 'startedAt', 'endedAt', 'location', 'tasks', 'participants']);

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent implements OnInit, AfterViewInit {
  isDetail$: Observable<boolean>;
  isTaskType$: Observable<boolean>;
  isHostType$: Observable<boolean>;
  minStart$: Observable<Date>;
  initType$: Observable<ActivityType>;
  update$: Observable<boolean> = of(false);
  reset$ = new Subject();

  expandedHeight = '48px';
  step = 1;

  form: FormGroup;
  activity: Activity;
  tasks: Task[];
  updatedTasksMeta: UpdateMeta<Task> = {
    create: [],
    update: [],
    delete: []
  };

  @ViewChild(TasksManageListComponent) tasksManageListComp: TasksManageListComponent;

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
    this.form = this.fb.group(DEFAULT_ACTIVITY_FORM);

    const resolveActivity$: Observable<Activity> = this.route.data.pipe(
      tap((resolve) => {
        this.activity = resolve.activity;

        const typeControl = this.form.get('type');

        if (this.activity) {
          this.form.reset(pickActivityProps(resolve.activity));

          // 无法更改活动的类型
          typeControl.disable();

          this.reset$.next();

          this.tasks = this.activity.tasks;
        } else {
          this.tasks = [];
        }
      }),
      map(resolve => resolve.activity),
      publishBehavior(null),
      refCount()
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
  }

  ngAfterViewInit() {
    const updateOn$ = merge(this.form.valueChanges, this.tasksManageListComp.updateTasksRequest).pipe(
      mapTo(true)
    );
    const updateOff$ = this.reset$.pipe(
      mapTo(false)
    );

    this.update$ = merge(this.update$, updateOn$, updateOff$)
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
      const resetActivity: Activity = pickActivityProps(this.activity);

      // reset basic info
      this.form.reset(resetActivity);
      // reset tasks

      this.tasks = resetActivity.tasks;
    } else {
      // reset to default
      this.form.reset(DEFAULT_ACTIVITY_FORM);
      this.tasks = [];
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

  updateTasksRequest(payload: UpdateOperationPayload<Task | Partial<Task>>) {
    const { create, update } = this.updatedTasksMeta;

    switch (payload.operation) {
      case UpdateOperation.CREATE:
        this.updatedTasksMeta.create.push(payload.data);
        break;
      case UpdateOperation.DELETE:
        // 如果删除的是刚刚增加的 task
        this.updatedTasksMeta.create = R.filter(R.complement(R.propEq('id', payload.data.id)), create);
        // 如果删除的是刚刚编辑的 task
        this.updatedTasksMeta.update = R.filter(R.complement(R.propEq('id', payload.data.id)), update);

        if (!payload.fake) {
          this.updatedTasksMeta.delete.push(payload.data.id);
        }
        break;
      case UpdateOperation.UPDATE:
        const idx = R.findIndex(R.propEq('id', payload.data.id), create);

        if (idx > -1) {
          // 如果编辑的是刚刚创建的 task
          this.updatedTasksMeta.create = R.update(idx, payload.data, create);
        } else {
          this.updatedTasksMeta.update.push(payload.data as Task);
        }
        break;

    }
  }

  private create() {
    const nextActivity = this.form.getRawValue();

    const tasksMeta = {
      create: R.map<Partial<Task>, {name: string}>(R.pick(['name']), this.tasks)
    };

    this.activityService.create(nextActivity, tasksMeta).subscribe(activity => {
      this.toastService.success(this.translate.instant('TOAST.SUCCESS.CREATE_SUCCESS'));

      this.redirect();
    });
  }

  private update(id: string) {
    const nextActivity = this.form.getRawValue();

    const tasksMeta = {
      create: R.map<Partial<Task>, {name: string}>(R.pick(['name']), this.updatedTasksMeta.create),
      update: R.map<Task, Task>(R.pick(['id', 'name']), this.updatedTasksMeta.update),
      delete: this.updatedTasksMeta.delete
    };

    this.activityService.update(id, nextActivity, tasksMeta)
      .subscribe(activity => {
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.UPDATE_SUCCESS'));

        this.redirect();
      });
  }

  private redirect() {
    this.router.navigate(['/profile/activity/list']);
  }
}
