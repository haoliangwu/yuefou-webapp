import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from './task.service';
import { Task, ProcessStatus, tasksConnectionQuery, tasksConnectionQueryVariables, AppConfig, PageInfoFragmentFragment, User } from '../../model';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { map, tap, filter, flatMap, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { translateProcessStatus } from '../../utils';
import { QueryRef } from 'apollo-angular';
import { AppConfigToken } from '../../app.config';
import { LocalStorage } from 'ngx-webstorage';
import { LOCALSTORAGE } from '../../constants';
import { MatDialogRef } from '@angular/material';
import { AssignTaskComponent } from '../../shared/modules/dialog/assign-task/assign-task.component';

const translateTaskProcessStatus = task => {
  const status = R.compose(translateProcessStatus, R.prop('status'))(task);
  return R.assoc('status', status, task);
};

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  step = 0;
  tasksQuery: QueryRef<tasksConnectionQuery, tasksConnectionQueryVariables>;
  tasks$: Observable<Task[]>;
  pageInfo: PageInfoFragmentFragment;
  @LocalStorage(LOCALSTORAGE.USER) user: User;
  assignDialogRef: MatDialogRef<AssignTaskComponent, User>;

  constructor(
    private taskService: TaskService,
    private dialogUtil: DialogUtilService,
    private translate: TranslateService,
    private toastService: ToastrService,
    @Inject(AppConfigToken) private appConfig: AppConfig
  ) { }

  ngOnInit() {
    this.tasksQuery = this.taskService.tasksConnection({
      ...this.appConfig.pagination
    });

    this.tasks$ = this.tasksQuery.valueChanges.pipe(
      filter(result => !result.loading),
      map(result => {
        const { edges, pageInfo } = result.data.tasksConnection;

        this.pageInfo = pageInfo;

        return R.map(R.prop('node'), edges) as Task[];
      })
    );

    this.taskService.tasksSub(this.tasksQuery, (prev: tasksConnectionQuery, { subscriptionData: { data } }) => {
      const { updatedTask: { mutation, node } } = data;

      switch (mutation) {
        case 'CREATED':
          this.tasksQuery.refetch();
          return prev;
        case 'UPDATED':
        default:
          return prev;
      }
    });
  }

  loadMore() {
    this.taskService.tasksFetchMore(this.tasksQuery, this.pageInfo.endCursor);
  }

  assign(task: Task) {
    const creator = R.path<User>(['activity', 'creator'], task);
    const participants = R.path<User[]>(['activity', 'participants'], task);

    const excludeUser = R.filter(R.complement(R.propEq('id', this.user.id)));

    this.assignDialogRef = this.dialogUtil.assignTask({
      data: {
        assignees: excludeUser([...participants, creator])
      }
    });

    this.assignDialogRef.afterClosed().pipe(
      switchMap(assignee => this.taskService.assign({
        id: task.activity.id,
        taskId: task.id,
        assigneeId: assignee.id
      })),
      tap(nextTask => this.toastService.success(this.translate.instant('TASK.TOAST.ASSIGN_SUCCESS', {
        task: nextTask,
        target: nextTask.assignee
      })))
    ).subscribe();
  }

  start(task: Task) {
    this.updateStatus(task, ProcessStatus.PENDING);
  }

  done(task: Task) {
    this.updateStatus(task, ProcessStatus.DONE);
  }

  stop(task: Task) {
    this.updateStatus(task, ProcessStatus.STOP);
  }

  reopen(task: Task) {
    this.updateStatus(task, ProcessStatus.INIT);
  }

  private updateStatus(task: Task, status: ProcessStatus) {
    this.dialogUtil.confirm({
      data: {
        message: this.translate.instant(`DIALOG.TASK_OPERATION.${status}`)
      }
    }).afterClosed().pipe(
      filter(e => !!e),
      flatMap(() => this.taskService.updateTaskStatus(task, status)),
      tap(nextTask => {
        nextTask = translateTaskProcessStatus(nextTask);

        this.toastService.info(this.translate.instant('TASK.CHANGE_STATUS', nextTask), nextTask.name);
      })
    ).subscribe();
  }
}
