import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import { User } from '../../model';

@Injectable()
export class UserService {

  constructor(
    private apollo: Apollo
  ) { }

  me(): Observable<ApolloQueryResult<{ me: User }>> {
    const query = gql`{me{id name avatar}}`;

    return this.apollo.query({ query });
  }
}
