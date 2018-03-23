import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';

import * as R from 'ramda';
import { map } from 'rxjs/operators';

import { Task, ProcessStatus } from '../../model';
import { TasksQuery, TaskQuery, CreateTaskMutation, UpdateTaskMutation, DeleteTaskMutation, AssignTaskMutation, UpdateTaskStatusMutation } from './task.graphql';

@Injectable()
export class TaskService {

  constructor(
    private apollo: Apollo
  ) { }

  tasksWatch() {
    return this.apollo.watchQuery<{ tasks: Task[] }>({ query: TasksQuery });
  }

  tasks() {
    const accessor = R.path<Task[]>(['data', 'tasks']);

    return this.apollo.query({
      query: TasksQuery
    }).pipe(map(accessor));
  }

  task() {
    const accessor = R.path<Task>(['data', 'task']);

    return this.apollo.query({
      query: TaskQuery
    }).pipe(map(accessor));
  }

  create() {
    const accessor = R.path<Task>(['data', 'createTask']);

    return this.apollo.mutate({
      mutation: CreateTaskMutation
    }).pipe(map(accessor));
  }

  update(task: Task) {
    const accessor = R.path<Task>(['data', 'updateTask']);

    const variables = {
      id: task.activity.id,
      task
    };

    return this.apollo.mutate({
      mutation: UpdateTaskMutation,
      variables
    }).pipe(map(accessor));
  }

  updateTaskStatus(task: Task, status: ProcessStatus) {
    const accessor = R.path<Task>(['data', 'updateTaskStatus']);

    const variables = {
      id: task.activity.id,
      taskId: task.id,
      status
    };

    return this.apollo.mutate({
      mutation: UpdateTaskStatusMutation,
      variables
    }).pipe(map(accessor));
  }

  delete() {
    const accessor = R.path<Task>(['data', 'deleteTask']);

    return this.apollo.mutate({
      mutation: DeleteTaskMutation
    }).pipe(map(accessor));
  }

  assign() {
    const accessor = R.path<Task>(['data', 'assignTask']);

    return this.apollo.mutate({
      mutation: AssignTaskMutation
    }).pipe(map(accessor));
  }
}
