import * as R from 'ramda';

import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Task, UpdateOperationPayload, UpdateOperation } from '../../../model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tasks-manage-list',
  templateUrl: './tasks-manage-list.component.html',
  styleUrls: ['./tasks-manage-list.component.scss']
})
export class TasksManageListComponent implements OnInit {
  form: FormGroup;

  // 代表当前是 编辑活动 还是 创建活动
  @Input() isDetail = false;
  @Input() tasks: Task[];
  @Output() tasksChange = new EventEmitter<(Task | Partial<Task>)[]>();
  @Output() updateTasksRequest = new EventEmitter<UpdateOperationPayload<Task | Partial<Task>>>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.maxLength(48)]]
    });
  }

  edit(task: Task) {
    const idx = R.findIndex(R.propEq('id', task.id), this.tasks);

    if (this.isDetail) {
      // 当前仅支持修改任务名称
      task = { ...this.tasks[idx], name: task.name };

      this.updateTasksRequest.next({
        operation: UpdateOperation.UPDATE,
        data: task
      });
    }

    const nextTasks = R.update(idx, task, this.tasks);

    this.tasksChange.next(nextTasks);
  }

  delete(task: Task) {
    // 当前页面时编辑页面 同时删除 task 是一个真实实例
    if (this.isDetail) {
      this.updateTasksRequest.next({
        operation: UpdateOperation.DELETE,
        data: task,
        fake: !task.activity
      });
    }

    const idx = R.findIndex(R.propEq('id', task.id), this.tasks);

    const nextTasks = R.remove(idx, 1, this.tasks);

    this.tasksChange.next(nextTasks);
  }

  create(task: Partial<Task>) {
    task = {
      id: `${this.tasks.length}`,
      ...task
    };

    if (this.isDetail) {
      this.updateTasksRequest.next({
        operation: UpdateOperation.CREATE,
        data: task
      });
    }

    const nextTasks = R.append(task, this.tasks);

    this.tasksChange.next(nextTasks);
  }
}
