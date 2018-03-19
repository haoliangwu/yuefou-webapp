import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ApolloQueryResult } from 'apollo-client';
import { Activity } from '../../model';
import { map } from 'rxjs/operators';
import * as R from 'ramda';

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
}
