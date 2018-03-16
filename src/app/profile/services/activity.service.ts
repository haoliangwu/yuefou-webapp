import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { GraphqlResultPayload } from '../../model';
import { of } from 'rxjs/observable/of';

export interface Activity {
  id: string;
  title: string;
  desc: string;
  startedAt: string;
  creator: {
    id: string
    name: string
  };
}

export interface ActivitiesQueryPayload {
  activities: Activity[];
}

@Injectable()
export class ActivityService {

  constructor(
    public apollo: Apollo
  ) { }

  activities(): Observable<GraphqlResultPayload<ActivitiesQueryPayload>> {
    const query = gql`{activities{id title desc startedAt creator{id name}}}`;

    return this.apollo.query({ query });
  }

  activity(id) {
    return of({
      id: Math.random() * 10
    });
  }
}
