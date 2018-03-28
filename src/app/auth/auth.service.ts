import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { ApolloQueryResult } from 'apollo-client';
import { ActivitiesQuery } from '../profile/activity/activity.graphql';

export interface LoginMutationPayload {
  login: {
    token: string
  };
}

export interface SignupMutationPayload {
  signup: {
    token: string
  };
}

@Injectable()
export class AuthService {

  constructor(
    public apollo: Apollo
  ) { }

  login(email: string, password: string) {
    const mutation = gql`mutation login {login(email:"${email}", password: "${password}"){token}}`;

    return this.apollo.mutate({
      mutation
    });
  }

  signup(email: string, password: string, name: string) {
    const mutation = gql`mutation signup {signup(email:"${email}", password: "${password}", name: "${name}"){token}}`;

    return this.apollo.mutate({ mutation });
  }
}
