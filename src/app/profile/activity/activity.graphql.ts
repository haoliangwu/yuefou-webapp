import gql from 'graphql-tag';

// fragment
export const ActivityFragment = gql`fragment ActivityFragment on Activity{id title desc status type location startedAt endedAt creator{id name}participants{id name}tasks{id name}}`;

// query
export const ActivitiesQuery = gql`query {activities{...ActivityFragment}} ${ActivityFragment}`;

export const ActivityQuery = gql`query activity($id: String) {activity(id: $id){...ActivityFragment}} ${ActivityFragment}`;

// mutation
export const CreateActivityMutation = gql`mutation createActivity($activity:CreateActivityInput){createActivity(activity:$activity){...ActivityFragment}} ${ActivityFragment}`;

export const UpdateActivityMutation = gql`mutation updateActivity($activity:UpdateActivityInput){updateActivity(activity:$activity){...ActivityFragment}} ${ActivityFragment}`;

export const DeleteActivityMutation = gql`mutation deleteActivity($id: ID!) {deleteActivity(id: $id){id}}`;

export const AttendActivityMutation = gql`mutation attendActivity($id:ID!){attendActivity(id:$id){...ActivityFragment}} ${ActivityFragment}`;

export const QuitActivityMutation = gql`mutation quitActivity($id:ID!){quitActivity(id:$id){...ActivityFragment}} ${ActivityFragment}`;
