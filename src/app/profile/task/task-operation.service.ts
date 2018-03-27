import * as R from 'ramda';

import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { MatDialogRef } from '@angular/material';
import { switchMap, tap, filter, flatMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { Task, User, ProcessStatus } from '../../model';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { LOCALSTORAGE } from '../../constants';
import { AssignTaskComponent } from '../../shared/modules/dialog/assign-task/assign-task.component';
import { TaskService } from './task.service';
import { translateProcessStatus } from '../../utils';

const translateTaskProcessStatus = task => {
  const status = R.compose(translateProcessStatus, R.prop('status'))(task);
  return R.assoc('status', status, task);
};

@Injectable()
export class TaskOperationService {

  @LocalStorage(LOCALSTORAGE.USER) user: User;
  assignDialogRef: MatDialogRef<AssignTaskComponent, User>;

  constructor(
    private dialogUtil: DialogUtilService,
    private taskService: TaskService,
    private translate: TranslateService,
    private toastService: ToastrService,
  ) { }

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
      filter(e => !!e),
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
