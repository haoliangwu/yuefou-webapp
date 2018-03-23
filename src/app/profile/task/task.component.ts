import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task, ProcessStatus } from '../../model';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { translateProcessStatus } from '../../utils';
import { QueryRef } from 'apollo-angular';

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
  tasksQuery: QueryRef<{ tasks: Task[] }>;

  constructor(
    private taskService: TaskService,
    private dialogUtil: DialogUtilService,
    private translate: TranslateService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.tasksQuery = this.taskService.tasksWatch();

    this.taskService.tasksSub(this.tasksQuery, (prev, { subscriptionData: { data } }) => {
      if (R.isNil(data)) {
        return prev;
      }

      return R.merge(prev, data);
    });
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
