import * as R from 'ramda';

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import { User, updateUserMutation, updateUserMutationVariables } from '../../model';
import { MeQuery, UpdateUserMutation } from '../graphql';
import { CosSdkService } from './cos-sdk.service';
import { LocalStorageService } from 'ngx-webstorage';
import { LOCALSTORAGE } from '../../constants';

@Injectable()
export class UserService {

  constructor(
    private apollo: Apollo,
    private cos: CosSdkService,
    private storage: LocalStorageService
  ) { }

  me(): Observable<ApolloQueryResult<{ me: User }>> {
    return this.apollo.query({ query: MeQuery });
  }

  update(user: User): Observable<User> {
    const variables = {
      user: R.pick(['email', 'name', 'avatar'], user)
    };

    return this.apollo.mutate<updateUserMutation, updateUserMutationVariables>({
      mutation: UpdateUserMutation,
      variables
    }).pipe(
      map(res => res.data.updateUser),
      tap(newUser => {
        this.storage.store(LOCALSTORAGE.USER, newUser);
      })
    );
  }

  uploadAvatar(id: string, file: File) {
    return this.cos.sliceUploadFile(file.name, file, id);
  }
}
