import gql from 'graphql-tag';

// fragment
export const UserFragment = gql`fragment UserFragment on User {
  id
  name
  avatar
}`;
