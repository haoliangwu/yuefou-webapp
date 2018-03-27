import { Injectable, Query, Inject } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import * as R from 'ramda';

import { LOADING_MASK_HEADER } from 'ngx-loading-mask';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { Activity, activitiesConnectionQuery, activitiesQuery, ForwardPaginationInput, activitiesConnectionQueryVariables, AppConfig } from '../../model';
import { ActivitiesQuery, ActivityQuery, ActivityFragment, CreateActivityMutation, UpdateActivityMutation, DeleteActivityMutation, AttendActivityMutation, QuitActivityMutation, ActivitiesConnection } from '../activity/activity.graphql';
import { AppConfigToken } from '../../app.config';

@Injectable()
export class ActivityService {
  private pagination: ForwardPaginationInput;

  constructor(
    private apollo: Apollo,
    private toastService: ToastrService,
    private translate: TranslateService,
    @Inject(AppConfigToken) private appConfig: AppConfig
  ) { }

  private cacheActivites(proxy: DataProxy, variables: activitiesConnectionQueryVariables = { pagination: this.appConfig.pagination }): activitiesConnectionQuery {
    return proxy.readQuery<activitiesConnectionQuery>({ query: ActivitiesConnection, variables });
  }

  private cacheActivity(id: string, proxy: DataProxy) {
    const variables = { id };

    return proxy.readQuery<{ activity: Activity }>({ query: ActivityQuery, variables });
  }

  activitiesConnection(pagination: ForwardPaginationInput): QueryRef<activitiesConnectionQuery, activitiesConnectionQueryVariables> {
    this.pagination = pagination;

    return this.apollo.watchQuery({
      query: ActivitiesConnection,
      variables: { pagination }
    });
  }

  activitiesFetchMore(query: QueryRef<activitiesConnectionQuery, activitiesConnectionQueryVariables>, after: string) {
    this.pagination = {
      ...this.appConfig.pagination,
      after
    };

    return query.fetchMore({
      variables: {
        pagination: this.pagination
      },
      updateQuery: (prev: activitiesConnectionQuery, { fetchMoreResult }) => {
        fetchMoreResult.activitiesConnection.edges = [...prev.activitiesConnection.edges, ...fetchMoreResult.activitiesConnection.edges];

        return fetchMoreResult;
      }
    });
  }

  activities(): QueryRef<activitiesQuery> {
    return this.apollo.watchQuery({
      query: ActivitiesQuery
    });
  }

  activity(id: string): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'activity']);

    const variables = { id };

    return this.apollo.query({ query: ActivityQuery, variables }).pipe(
      map(accessor)
    );
  }

  create(activity: Activity): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'createActivity']);
    const variables = { activity };

    return this.apollo.mutate({
      mutation: CreateActivityMutation,
      refetchQueries: [
        {
          query: ActivitiesConnection,
          variables: {
            pagination: this.pagination
          }
        }
      ],
      variables
    }).pipe(
      map(accessor)
    );
  }

  update(id: string, activity: Activity): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'updateActivity']);

    const formatFn = R.compose(R.dissoc('type'), R.merge({ id }));

    const variables = { activity: formatFn(activity) };

    return this.apollo.mutate({ mutation: UpdateActivityMutation, variables }).pipe(
      map(accessor)
    );
  }

  delete(id: string): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'deleteActivity']);

    const variables = { id };

    return this.apollo.mutate({
      mutation: DeleteActivityMutation,
      variables,
      refetchQueries: [
        {
          query: ActivitiesConnection,
          variables: {
            pagination: this.pagination
          }
        }
      ]
    }).pipe(
      map(accessor)
    );
  }

  attend(id: string): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'attendActivity']);

    const variables = { id };

    return this.apollo.mutate({
      mutation: AttendActivityMutation,
      variables,
      refetchQueries: [
        {
          query: ActivitiesConnection,
          variables: {
            pagination: this.pagination
          }
        }
      ]
    }).pipe(
      map(accessor)
    );
  }

  quit(id: string): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'quitActivity']);

    const variables = { id };

    return this.apollo.mutate({
      mutation: QuitActivityMutation,
      variables,
      refetchQueries: [
        {
          query: ActivitiesConnection,
          variables: {
            pagination: this.pagination
          }
        }
      ]
    }).pipe(
      map(accessor),
    );
  }

  isActivityExist(id: string): Observable<boolean> {
    const accessor = R.path<Activity>(['data', 'activity']);

    const variables = { id, [LOADING_MASK_HEADER]: false };

    return this.apollo.query({ query: ActivityQuery, variables }).pipe(
      map(accessor),
      map(e => R.complement(R.isNil)(e))
    );
  }

  share() {
    this.toastService.success(this.translate.instant('ACTIVITY.SHARE'));
  }
}
