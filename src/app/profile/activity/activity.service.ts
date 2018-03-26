import { Injectable, Query } from '@angular/core';
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

import { Activity, activitiesConnectionQuery, activitiesQuery, activitiesConnectionQueryVariables } from '../../model';
import { ActivitiesQuery, ActivityQuery, ActivityFragment, CreateActivityMutation, UpdateActivityMutation, DeleteActivityMutation, AttendActivityMutation, QuitActivityMutation, ActivitiesConnection } from '../activity/activity.graphql';
import { variable } from '@angular/compiler/src/output/output_ast';


@Injectable()
export class ActivityService {
  constructor(
    private apollo: Apollo,
    private toastService: ToastrService,
    private translate: TranslateService
  ) { }

  private cacheActivites(proxy: DataProxy) {
    return proxy.readQuery<{ activities: Activity[] }>({ query: ActivitiesQuery });
  }

  private cacheActivity(id: string, proxy: DataProxy) {
    const variables = { id };

    return proxy.readQuery<{ activity: Activity }>({ query: ActivityQuery, variables });
  }

  activitiesConnection(pagination: activitiesConnectionQueryVariables): QueryRef<activitiesConnectionQuery> {
    return this.apollo.watchQuery({
      query: ActivitiesConnection,
      variables: pagination
    });
  }

  activities(): QueryRef<activitiesQuery> {
    return this.apollo.watchQuery({
      query: ActivitiesQuery
    });
  }

  // activities(): Observable<Activity[]> {
  //   const accessor = R.path<Activity[]>(['data', 'activities']);

  //   return this.apollo.query({ query: ActivitiesQuery }).pipe(
  //     map(accessor)
  //   );
  // }

  activity(id: string): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'activity']);

    const variables = { id };

    return this.apollo.query({ query: ActivityQuery, variables }).pipe(
      map(accessor)
    );
  }

  create(activity: Activity): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'createActivity']);

    const update = (proxy: DataProxy, result: FetchResult<Activity>) => {
      const data = this.cacheActivites(proxy);

      data.activities = R.append(accessor(result), data.activities);

      proxy.writeQuery({ query: ActivitiesQuery, data });
    };

    const variables = { activity };

    return this.apollo.mutate({ mutation: CreateActivityMutation, update, variables }).pipe(
      map(accessor)
    );
  }

  update(id: string, activity: Activity): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'updateActivity']);

    const update = (proxy: DataProxy, result: FetchResult<Activity>) => {
      const data = this.cacheActivites(proxy);
      const originActivieData = this.cacheActivity(id, proxy);
      const updateActivity = R.merge(originActivieData, accessor(result));

      const idx = R.find(R.propEq('id', updateActivity.id), data.activities);
      data.activities = R.update(idx, updateActivity, data.activities);

      proxy.writeQuery({ query: ActivitiesQuery, data });
    };

    const formatFn = R.compose(R.dissoc('type'), R.merge({ id }));

    const variables = { activity: formatFn(activity) };

    return this.apollo.mutate({ mutation: UpdateActivityMutation, update, variables }).pipe(
      map(accessor)
    );
  }

  delete(id: string): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'deleteActivity']);

    const update = (proxy: DataProxy, result: FetchResult<Activity>) => {
      const data = this.cacheActivites(proxy);

      data.activities = R.filter(R.complement(R.propEq('id', accessor(result).id)), data.activities);

      proxy.writeQuery({ query: ActivitiesQuery, data });
    };

    const variables = { id };

    return this.apollo.mutate({ mutation: DeleteActivityMutation, variables, update }).pipe(
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
          query: ActivitiesQuery
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
          query: ActivitiesQuery
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
