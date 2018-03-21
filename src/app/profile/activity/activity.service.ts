import { Injectable, Query } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Activity } from '../../model';
import { map } from 'rxjs/operators';
import * as R from 'ramda';
import { merge, compose, dissoc } from 'ramda';

import { ActivitiesQuery, ActivityQuery, ActivityFragment, CreateActivityMutaion, UpdateActivityMutaion, DeleteActivityMutaion } from '../activity/activity.graphql';

@Injectable()
export class ActivityService {
  activities$: QueryRef<{ activities: Activity[] }> = this.apollo.watchQuery({
    query: ActivitiesQuery
  });

  constructor(
    private apollo: Apollo
  ) { }

  private cacheActivites(proxy: DataProxy) {
    return proxy.readQuery<{ activities: Activity[] }>({ query: ActivitiesQuery });
  }

  private cacheActivity(id: string, proxy: DataProxy) {
    const variables = { id };

    return proxy.readQuery<{ activity: Activity }>({ query: ActivityQuery, variables });
  }

  activities(): Observable<Activity[]> {
    const accessor = R.path<Activity[]>(['data', 'activities']);

    return this.apollo.query({ query: ActivitiesQuery }).pipe(
      map(accessor)
    );
  }

  activity(id: string): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'activity']);

    const variables = { id };

    return this.apollo.query({ query: ActivityQuery, variables }).pipe(
      map(accessor)
    );
  }

  activity$Factory(id: string): QueryRef<{ activity: Activity }> {
    return this.apollo.watchQuery({
      query: ActivityQuery,
      variables: { id }
    });
  }

  create(activity: Activity): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'createActivity']);

    const update = (proxy: DataProxy, result: FetchResult<Activity>) => {
      const data = this.cacheActivites(proxy);

      data.activities = R.append(accessor(result), data.activities);

      proxy.writeQuery({ query: ActivitiesQuery, data });
    };

    const variables = { activity };

    return this.apollo.mutate({ mutation: CreateActivityMutaion, update, variables }).pipe(
      map(accessor)
    );
  }

  update(id: string, activity: Activity): Observable<Activity> {
    const accessor = R.path<Activity>(['data', 'updateActivity']);

    const update = (proxy: DataProxy, result: FetchResult<Activity>) => {
      const data = this.cacheActivites(proxy);
      const originActivieData = this.cacheActivity(id, proxy);
      const updateActivity = merge(originActivieData, accessor(result));

      const idx = R.find(R.propEq('id', updateActivity.id), data.activities);
      data.activities = R.update(idx, updateActivity, data.activities);

      proxy.writeQuery({ query: ActivitiesQuery, data });
    };

    const formatFn = compose(dissoc('type'), merge({ id }));

    const variables = { activity: formatFn(activity) };

    return this.apollo.mutate({ mutation: UpdateActivityMutaion, update, variables }).pipe(
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

    return this.apollo.mutate({ mutation: DeleteActivityMutaion, variables, update }).pipe(
      map(accessor)
    );
  }
}
