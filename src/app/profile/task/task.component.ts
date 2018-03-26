import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from './task.service';
import { Task, ProcessStatus, tasksConnectionQuery, tasksConnectionQueryVariables, AppConfig } from '../../model';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { map, tap, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { translateProcessStatus } from '../../utils';
import { QueryRef } from 'apollo-angular';
import { AppConfigToken } from '../../app.config';

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
        const { edges } = result.data.tasksConnection;

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

  fetchMore(after: string) {
    this.taskService.tasksFetchMore(this.tasksQuery, after);
  }

  assign(task: Task) {
    const participants = R.path(['activity', 'participants'], task);
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
    this.taskService.updateTaskStatus(task, status).pipe(
      tap(nextTask => {
        nextTask = translateTaskProcessStatus(nextTask);

        this.toastService.success(this.translate.instant('TASK.CHANGE_STATUS', nextTask), nextTask.name);
      }),
    ).subscribe();
  }
}
