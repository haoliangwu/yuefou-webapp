import { Component, OnInit, ViewChild, ComponentRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { ActivityType, Activity, Task, UpdateOperationPayload, UpdateOperation, UpdateMeta, Recipe } from '../../model';
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
import { ActivityResolver } from './activity-resolver.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { formatUpdateMeta } from '../../utils';

const DEFAULT_ACTIVITY_FORM = {
  title: '',
  desc: '',
  type: ActivityType.HOST,
  startedAt: null,
  endedAt: null,
  location: ''
};

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss'],
  providers: [ActivityResolver]
})
export class ActivityCreateComponent implements OnInit, AfterViewInit {
  activity$: Observable<Activity>;
  isDetail$: Observable<boolean>;
  isTaskType$: Observable<boolean>;
  isHostType$: Observable<boolean>;
  titleText$: Observable<string>;
  minStart$: Observable<Date>;
  initType$: Observable<ActivityType>;
  update$: Observable<boolean>;
  reset$ = new Subject();
  taskUpdate$ = new Subject();
  recipeUpdate$ = new Subject();

  expandedHeight = '48px';
  step = 0;

  titleText: string;
  form: FormGroup;
  activity: Activity;
  tasks: Task[];
  private updatedTasksMeta: UpdateMeta<Task> = {
    create: [],
    update: [],
    delete: []
  };

  recipes: Recipe[];
  private _recipesMeta: UpdateMeta<Recipe>;

  get recipesMeta() {
    return this._recipesMeta;
  }

  set recipesMeta(val: UpdateMeta<Recipe>) {
    this._recipesMeta = val;
    this.recipeUpdate$.next();
  }

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

    this.activity$ = this.route.data.pipe(
      tap((resolve) => {
        this.activity = resolve.activity;

        const typeControl = this.form.get('type');

        if (this.activity) {
          this.form.patchValue(resolve.activity);

          // 无法更改活动的类型
          typeControl.disable();

          this.reset$.next();

          this.tasks = this.activity.tasks;
          this.recipes = this.activity.recipes;
        } else {
          this.tasks = [];
          this.recipes = [];
        }
      }),
      map(resolve => resolve.activity),
      publishBehavior(null),
      refCount()
    );

    const resolveRecipes$ = this.activity$.pipe(
      filter(activity => activity && activity.type === ActivityType.HOST),
      map(activity => activity.recipes)
    );

    this.titleText$ = this.activity$.pipe(map(activity => activity ? 'ACTIVITY.UPDATE' : 'ACTIVITY.CREATE'));

    this.isDetail$ = this.activity$.pipe(map(activity => !!activity));

    this.minStart$ = this.activity$.pipe(
      map(activity => activity ? new Date(activity.startedAt) : new Date())
    );

    this.initType$ = this.activity$.pipe(
      map(activity => activity ? activity.type : ActivityType.HOST)
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
    const updateOn$ = merge(this.form.valueChanges, this.taskUpdate$, this.recipeUpdate$).pipe(
      mapTo(true)
    );
    const updateOff$ = this.reset$.pipe(
      mapTo(false)
    );

    this.update$ = merge(updateOn$, updateOff$)
      .pipe(
        debounceTime(100),
        publish(),
        refCount()
      );
  }

  actionReqset(action: UpdateOperationPayload) {
    switch (action.operation) {
      case UpdateOperation.SAVE:
        this.save();
        return;
      case UpdateOperation.CANCEL:
        this.cancel();
        return;
      case UpdateOperation.DELETE:
        this.delete(action.data as Activity);
        return;
    }
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

    this.taskUpdate$.next();
  }

  private save() {
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

  private cancel() {
    if (this.activity) {
      // reset basic info
      this.form.reset(this.activity);
      // reset tasks
      this.tasks = this.activity.tasks;
      this.recipes = this.activity.recipes;
    } else {
      // reset to default
      this.formUtil.resetFormGroup(this.form);
      this.tasks = [];
      this.recipes = [];
    }

    this.updatedTasksMeta = {
      create: [],
      update: [],
      delete: []
    };

    this.recipesMeta = {
      connect: [],
      disconnect: []
    };

    this.reset$.next();
  }

  private delete(activity: Activity) {
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
    const nextActivity = this.form.value;

    const tasksMeta = {
      create: R.map<Partial<Task>, { name: string }>(R.pick(['name']), this.tasks)
    };

    const recipesMeta = formatUpdateMeta(this.recipesMeta);

    this.activityService.create(nextActivity, tasksMeta, recipesMeta).subscribe(activity => {
      this.toastService.success(this.translate.instant('TOAST.SUCCESS.CREATE_SUCCESS'));

      this.redirect();
    });
  }

  private update(id: string) {
    const nextActivity = this.form.value;

    const tasksMeta = {
      create: R.map<Partial<Task>, { name: string }>(R.pick(['name']), this.updatedTasksMeta.create),
      update: R.map<Task, Task>(R.pick(['id', 'name']), this.updatedTasksMeta.update),
      delete: this.updatedTasksMeta.delete
    };

    const recipesMeta = formatUpdateMeta(this.recipesMeta);

    this.activityService.update(id, nextActivity, tasksMeta, recipesMeta)
      .subscribe(activity => {
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.UPDATE_SUCCESS'));

        this.redirect();
      });
  }

  private redirect() {
    this.router.navigate(['/profile/activity/list']);
  }
}
