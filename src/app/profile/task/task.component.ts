import * as R from 'ramda';

import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from './task.service';
import { Task, User, tasksConnectionQuery, tasksConnectionQueryVariables, PageInfoFragmentFragment, AppConfig } from '../../model';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';

import { QueryRef } from 'apollo-angular';
import { AppConfigToken } from '../../app.config';
import { TaskOperationService } from './task-operation.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  step = 0;
  tasksQuery: QueryRef<tasksConnectionQuery, tasksConnectionQueryVariables>;
  tasks$: Observable<Task[]>;
  pageInfo: PageInfoFragmentFragment;

  constructor(
    private taskService: TaskService,
    public taskOperationService: TaskOperationService,
    @Inject(AppConfigToken) private appConfig: AppConfig
  ) { }

  ngOnInit() {
    this.tasksQuery = this.taskService.tasksConnection({
      ...this.appConfig.pagination
    });

    this.tasks$ = this.tasksQuery.valueChanges.pipe(
      filter(result => !result.loading),
      map(result => {
        const { edges, pageInfo } = result.data.tasksConnection;

        this.pageInfo = pageInfo;

        return R.map(R.prop('node'), edges) as Task[];
      })
    );

    this.taskService.tasksSub(this.tasksQuery, (prev: tasksConnectionQuery, { subscriptionData: { data } }) => {
      const { updatedTask: { mutation, node } } = data;

      switch (mutation) {
        case 'CREATED':
          this.tasksQuery.refetch();
          return prev;
        case 'UPDATED':
        default:
          return prev;
      }
    });
  }

  loadMore() {
    this.taskService.tasksFetchMore(this.tasksQuery, this.pageInfo.endCursor);
  }
}
