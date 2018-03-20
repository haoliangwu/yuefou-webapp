import gql from 'graphql-tag';

// fragment
export const ActivityFragment = gql`fragment ActivityFragment on Activity{id title desc status type location startedAt endedAt creator{id name}participants{id name}tasks{id name}}`;

// query
export const ActivitiesQuery = gql`query {activities{...ActivityFragment}} ${ActivityFragment}`;

export const ActivityQuery = gql`query activity($id: String) {activity(id: $id){...ActivityFragment}} ${ActivityFragment}`;

// mutation
