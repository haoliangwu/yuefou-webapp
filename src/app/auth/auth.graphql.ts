import gql from 'graphql-tag';
import { UserFragment } from '../shared/graphql';

// mutation
export const SignupMutation = gql`mutation signup($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
    user {
      ...UserFragment
    }
  }
} ${UserFragment}`;

export const LoginMutation = gql`mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      ...UserFragment
    }
  }
} ${UserFragment}`;
