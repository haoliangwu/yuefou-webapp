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

@Injectable()
export class ActivityService {

  constructor(
    private apollo: Apollo
  ) { }

  activities(): Observable<Activity[]> {
    const query = gql`{activities{id title desc status type location startedAt endedAt creator{id name}participants{id name}tasks{id name}}}`;

    return this.apollo.query({ query }).pipe(
      map(R.path(['data', 'activities']))
    );
  }

  activity(id): Observable<Activity> {
    const query = gql`{activity(id: "${id}"){id title desc status type location startedAt endedAt creator{id name}participants{id name}tasks{id name}}}`;

    return this.apollo.query({ query }).pipe(
      map(R.path(['data', 'activity']))
    );
  }

  create(activity: Activity): Observable<Activity> {
    const mutation = gql`mutation createActivity($activity:CreateActivityInput){createActivity(activity:$activity){id title desc status type location startedAt endedAt}}`;

    const variables = { activity };

    return this.apollo.mutate({ mutation, variables }).pipe(
      map(R.path(['data', 'createActivity']))
    );
  }

  update(id: string, activity: Activity): Observable<Activity> {
    const mutation = gql`mutation updateActivity($activity:UpdateActivityInput){updateActivity(activity:$activity){id title desc status type location startedAt endedAt}}`;

    const formatFn = compose(dissoc('type'), merge({ id }));

    const variables = { activity: formatFn(activity) };

    return this.apollo.mutate({ mutation, variables }).pipe(
      map(R.path(['data', 'updateActivity']))
    );
  }
}
