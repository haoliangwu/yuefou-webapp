import { Injectable, Inject } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';

import * as R from 'ramda';
import { map } from 'rxjs/operators';

import { Task, ProcessStatus, ForwardPaginationInput, tasksConnectionQuery, tasksConnectionQueryVariables, AppConfig, assignTaskMutationVariables } from '../../model';
import { TasksQuery, TaskQuery, CreateTaskMutation, UpdateTaskMutation, DeleteTaskMutation, AssignTaskMutation, UpdateTaskStatusMutation, UpdatedTaskSubscription, TasksConnection } from './task.graphql';
import { UpdateQueryFn } from 'apollo-client/core/watchQueryOptions';
import { AppConfigToken } from '../../app.config';

@Injectable()
export class TaskService {

  constructor(
    private apollo: Apollo,
    @Inject(AppConfigToken) private appConfig: AppConfig
  ) { }

  tasksConnection(pagination: ForwardPaginationInput): QueryRef<tasksConnectionQuery, tasksConnectionQueryVariables> {
    return this.apollo.watchQuery({
      query: TasksConnection,
      variables: { pagination }
    });
  }

  tasks() {
    return this.apollo.watchQuery<{ tasks: Task[] }>({ query: TasksQuery });
  }

  tasksFetchMore(query: QueryRef<tasksConnectionQuery, tasksConnectionQueryVariables>, after: string) {
    query.fetchMore({
      variables: {
        pagination: {
          ...this.appConfig.pagination,
          after
        }
      },
      updateQuery: (prev: tasksConnectionQuery, { fetchMoreResult }) => {
        fetchMoreResult.tasksConnection.edges = [...prev.tasksConnection.edges, ...fetchMoreResult.tasksConnection.edges];

        return fetchMoreResult;
      }
    });
  }

  tasksSub(query: QueryRef<tasksConnectionQuery, tasksConnectionQueryVariables>, cb: UpdateQueryFn) {
    query.subscribeToMore({
      document: UpdatedTaskSubscription,
      updateQuery: cb
    });
  }

  // tasks() {
  //   const accessor = R.path<Task[]>(['data', 'tasks']);

  //   return this.apollo.query({
  //     query: TasksQuery
  //   }).pipe(map(accessor));
  // }

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

  assign(variables: assignTaskMutationVariables) {
    const accessor = R.path<Task>(['data', 'assignTask']);

    return this.apollo.mutate({
      mutation: AssignTaskMutation,
      variables
    }).pipe(map(accessor));
  }
}
