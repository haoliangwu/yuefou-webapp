import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from '../../model';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { map } from 'rxjs/operators';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(
    private taskService: TaskService,
    private dialogUtil: DialogUtilService
  ) { }

  ngOnInit() {
    this.tasks$ = this.taskService.tasksWatch().valueChanges.pipe(
      map(R.path(['data', 'tasks']))
    );
  }

  assign(task: Task) {
    const participants = R.path(['activity', 'participants'], task);
  }

  start(task: Task) {

  }

  done(task: Task) {

  }

  stop(task: Task) {

  }

  reopen(task: Task) {

  }
}
