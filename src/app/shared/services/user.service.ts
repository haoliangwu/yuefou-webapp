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
    const query = gql`query me {me{id name avatar}}`;

    return this.apollo.query({ query });
  }

  uploadAvatar(file: File) {
    const mutation = gql`mutation uploadAvatar($file: Upload!) {
      uploadAvatar(file: $file) {
        id
        avatar
      }
    }`;

    const variables = { file };

    return this.apollo.use('upload').mutate({
      mutation,
      variables
    });
  }
}
