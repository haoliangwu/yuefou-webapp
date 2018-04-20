import gql from 'graphql-tag';

// fragment
export const UserFragment = gql`fragment UserFragment on User {
  id
  name
  email
  avatar
}`;

// query
export const MeQuery = gql`query me {me{...UserFragment}} ${UserFragment}`;

// mutation
export const UpdateUserMutation = gql`mutation updateUser($user: UpdateUserInput!){
  updateUser(user: $user) {
    ...UserFragment
  }
} ${UserFragment}`;
