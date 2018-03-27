import * as R from 'ramda';

import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../../model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface AssignTaskDialogData {
  current?: User;
  assignees: User[];
}

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent implements OnInit {

  isCurrentSelected = false;
  assignee: User;

  constructor(
    private dialogRef: MatDialogRef<AssignTaskComponent, User | boolean>,
    @Inject(MAT_DIALOG_DATA) public data: AssignTaskDialogData
  ) { }

  ngOnInit() {
    if (this.data.current) {
      this.assignee = R.find(R.propEq('id', this.data.current.id), this.data.assignees);

      this.isCurrentSelected = true;
    } else {
      this.assignee = R.head(this.data.assignees);
      this.isCurrentSelected = false;
    }
  }

  assign() {
    if (this.isCurrentSelected) {
      this.dialogRef.close(false);
    } else {
      this.dialogRef.close(this.assignee);
    }
  }
}
