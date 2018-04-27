import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { ApolloQueryResult } from 'apollo-client';
import { ActivitiesQuery } from '../profile/activity/activity.graphql';
import { SignupMutation, LoginMutation } from './auth.graphql';
import { loginMutation, loginMutationVariables, signupMutation, signupMutationVariables } from '../model';

@Injectable()
export class AuthService {

  constructor(
    public apollo: Apollo
  ) { }

  login(email: string, password: string) {
    return this.apollo.mutate<loginMutation, loginMutationVariables>({
      mutation: LoginMutation,
      variables: {
        email,
        password
      }
    });
  }

  signup(email: string, password: string, name: string) {
    return this.apollo.mutate<signupMutation, signupMutationVariables>({
      mutation: SignupMutation,
      variables: {
        email,
        password,
        name
      }
    });
  }
}
