import gql from 'graphql-tag';
import { PageInfoFragment } from '../../utils/pagination.graphql';
import { TaskFragment } from '../task/task.graphql';

// fragment
export const ActivityFragment = gql`fragment ActivityFragment on Activity {
  id
  title
  desc
  status
  type
  location
  startedAt
  endedAt
  creator {
    id
    name
  }
  participants {
    id
    name
  }
  tasks {
    ...TaskFragment
  }
} ${TaskFragment}`;

// query
export const ActivitiesQuery = gql`query activities {
  activities {
    ...ActivityFragment
  }
} ${ActivityFragment}`;

export const ActivitiesConnection = gql`query activitiesConnection($pagination: ForwardPaginationInput) {
  activitiesConnection(pagination: $pagination) {
    edges {
      node {
        ...ActivityFragment
      }
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
} ${ActivityFragment} ${PageInfoFragment}`;

export const ActivityQuery = gql`query activity($id: ID!) {
  activity(id: $id) {
    ...ActivityFragment
  }
} ${ActivityFragment}`;

// mutation
export const CreateActivityMutation = gql`mutation createActivity($activity: CreateActivityInput!, $tasksMeta: TasksMetaInput) {
  createActivity(activity: $activity, tasksMeta: $tasksMeta) {
    ...ActivityFragment
  }
} ${ActivityFragment}`;

export const UpdateActivityMutation = gql`mutation updateActivity($activity: UpdateActivityInput!, $tasksMeta: TasksMetaInput) {
  updateActivity(activity: $activity, tasksMeta: $tasksMeta) {
    ...ActivityFragment
  }
} ${ActivityFragment}`;

export const DeleteActivityMutation = gql`mutation deleteActivity($id: ID!) {
  deleteActivity(id: $id) {
    id
  }
}`;

export const AttendActivityMutation = gql`mutation attendActivity($id: ID!) {
  attendActivity(id: $id) {
    ...ActivityFragment
  }
} ${ActivityFragment}`;

export const QuitActivityMutation = gql`mutation quitActivity($id: ID!) {
  quitActivity(id: $id) {
    ...ActivityFragment
  }
} ${ActivityFragment}`;
