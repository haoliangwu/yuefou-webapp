import * as R from 'ramda';

import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../../model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface AssignTaskDialogData {
  assignees: User[];
}

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent implements OnInit {

  assignee: User;

  constructor(
    private dialogRef: MatDialogRef<AssignTaskComponent, User>,
    @Inject(MAT_DIALOG_DATA) public data: AssignTaskDialogData
  ) { }

  ngOnInit() {
    this.assignee = R.head(this.data.assignees);
  }

  assign() {
    this.dialogRef.close(this.assignee);
  }
}
