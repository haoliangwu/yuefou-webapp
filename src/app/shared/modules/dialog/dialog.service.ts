import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CreateActivityDialogComponent } from './create-activity-dialog/create-activity-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { AttendActivityComponent } from './attend-activity/attend-activity.component';
import { AssignTaskComponent, AssignTaskDialogData } from './assign-task/assign-task.component';

@Injectable()
export class DialogUtilService {

  constructor(
    private dialog: MatDialog
  ) { }

  private open<T, R = any>(comp: ComponentType<T>, opts: MatDialogConfig): MatDialogRef<T, R> {
    const baseOpts: MatDialogConfig = {
      hasBackdrop: true,
      autoFocus: false
    };

    return this.dialog.open(comp, { ...baseOpts, ...opts });
  }

  assignTask(opts: MatDialogConfig<AssignTaskDialogData> = {}) {
    return this.open<AssignTaskComponent>(AssignTaskComponent, opts);
  }

  attendActivity(opts: MatDialogConfig = {}) {
    return this.open<AttendActivityComponent>(AttendActivityComponent, opts);
  }

  createActivity(opts: MatDialogConfig = {}) {
    return this.open<CreateActivityDialogComponent>(CreateActivityDialogComponent, opts);
  }

  confirm(opts: MatDialogConfig<ConfirmDialogData> = {}) {
    return this.open<ConfirmDialogComponent>(ConfirmDialogComponent, opts);
  }
}
