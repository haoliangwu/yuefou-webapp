import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ApolloQueryResult } from 'apollo-client';
import { Activity } from '../../model';
import { map } from 'rxjs/operators';
import * as R from 'ramda';
import { merge, compose, dissoc } from 'ramda';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';

// fp utils

// query utils
const activitiesQuery = gql`{activities{id title desc status type location startedAt endedAt creator{id name}participants{id name}tasks{id name}}}`;

const activityQueryFactory = id => gql`{activity(id: "${id}"){id title desc status type location startedAt endedAt creator{id name}participants{id name}tasks{id name}}}`;

@Injectable()
export class ActivityService {

  constructor(
    private apollo: Apollo
  ) { }

  private cacheActivites(proxy: DataProxy) {
    return proxy.readQuery<{ activities: Activity[] }>({ query: activitiesQuery });
  }

  private cacheActivity(id: string, proxy: DataProxy) {
    return proxy.readQuery<{ activity: Activity }>({ query: activityQueryFactory(id) });
  }

  activities(): Observable<Activity[]> {
    return this.apollo.query({ query: activitiesQuery }).pipe(
      map(R.path(['data', 'activities']))
    );
  }

  activity(id): Observable<Activity> {
    return this.apollo.query({ query: activityQueryFactory(id) }).pipe(
      map(R.path(['data', 'activity']))
    );
  }

  create(activity: Activity): Observable<Activity> {
    const mutation = gql`mutation createActivity($activity:CreateActivityInput){createActivity(activity:$activity){id title desc status type location startedAt endedAt}}`;

    const accessor = R.path<Activity>(['data', 'createActivity']);

    const update = (proxy: DataProxy, result: FetchResult<Activity>) => {
      const data = this.cacheActivites(proxy);

      data.activities = R.append(accessor(result), data.activities);

      proxy.writeQuery({ query: activitiesQuery, data });
    };

    const variables = { activity };

    return this.apollo.mutate({ mutation, update, variables }).pipe(
      map(accessor)
    );
  }

  update(id: string, activity: Activity): Observable<Activity> {
    const mutation = gql`mutation updateActivity($activity:UpdateActivityInput){updateActivity(activity:$activity){id title desc status type location startedAt endedAt}}`;

    const accessor = R.path<Activity>(['data', 'updateActivity']);

    const update = (proxy: DataProxy, result: FetchResult<Activity>) => {
      const data = this.cacheActivites(proxy);
      const originActivieData = this.cacheActivity(id, proxy);
      const updateActivity = merge(originActivieData, accessor(result));

      const idx = R.find(R.propEq('id', updateActivity.id), data.activities);
      data.activities = R.update(idx, updateActivity, data.activities);

      proxy.writeQuery({ query: activitiesQuery, data });
    };

    const formatFn = compose(dissoc('type'), merge({ id }));

    const variables = { activity: formatFn(activity) };

    return this.apollo.mutate({ mutation, update, variables }).pipe(
      map(accessor)
    );
  }

  delete(id: string): Observable<Activity> {
    const mutation = gql`mutation {deleteActivity(id:"${id}"){id}}`;

    const accessor = R.path<Activity>(['data', 'deleteActivity']);

    const update = (proxy: DataProxy, result: FetchResult<Activity>) => {
      const data = this.cacheActivites(proxy);

      data.activities = R.filter(R.complement(R.propEq('id', accessor(result).id)), data.activities);

      proxy.writeQuery({ query: activitiesQuery, data });
    };

    return this.apollo.mutate({ mutation, update }).pipe(
      map(accessor)
    );
  }
}
