import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';

import * as R from 'ramda';
import { map } from 'rxjs/operators';

import { Task } from '../../model';
import { TasksQuery, TaskQuery, CreateTaskMutation, UpdateTaskMutation, DeleteTaskMutation, AssignTaskMutation } from './task.graphql';

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
    const accessor = R.path<Task[]>(['data', 'task']);

    return this.apollo.query({
      query: TaskQuery
    }).pipe(map(accessor));
  }

  create() {
    const accessor = R.path<Task[]>(['data', 'createTask']);

    return this.apollo.mutate({
      mutation: CreateTaskMutation
    }).pipe(map(accessor));
  }

  update() {
    const accessor = R.path<Task[]>(['data', 'updateTask']);

    return this.apollo.mutate({
      mutation: UpdateTaskMutation
    }).pipe(map(accessor));
  }

  delete() {
    const accessor = R.path<Task[]>(['data', 'deleteTask']);

    return this.apollo.mutate({
      mutation: DeleteTaskMutation
    }).pipe(map(accessor));
  }

  assign() {
    const accessor = R.path<Task[]>(['data', 'assignTask']);

    return this.apollo.mutate({
      mutation: AssignTaskMutation
    }).pipe(map(accessor));
  }
}
