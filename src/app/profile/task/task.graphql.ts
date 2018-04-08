import gql from 'graphql-tag';
import { PageInfoFragment } from '../../shared/graphql';

// fragment
export const TaskFragment = gql`fragment TaskFragment on ActivityTask {
  id
  name
  status
  assignee {
    id
    name
  }
  activity {
    id
    title
    participants {
      id
      name
    }
    creator {
      id
      name
    }
  }
}`;

// query
export const TasksQuery = gql`query tasks {
  tasks {
    ...TaskFragment
  }
} ${TaskFragment}`;

export const TasksConnection = gql`query tasksConnection($pagination: ForwardPaginationInput) {
  tasksConnection(pagination: $pagination) {
    edges {
      node {
        ...TaskFragment
      }
    }

    pageInfo {
      ...PageInfoFragment
    }
  }
} ${TaskFragment} ${PageInfoFragment}`;

export const TaskQuery = gql`query task($id: ID!) {
  task(id: $id) {
    ...TaskFragment
  }
} ${TaskFragment}`;

// mutation
export const CreateTaskMutation = gql`mutation createTask($id: ID!, $task: CreateTaskInput!) {
  createTask(task: $task, id: $id) {
    ...TaskFragment
  }
} ${TaskFragment}`;

export const UpdateTaskMutation = gql`mutation updateTask($id: ID!, $task: UpdateTaskInput!) {
  updateTask(id: $id, task: $task) {
    ...TaskFragment
  }
} ${TaskFragment}`;

export const UpdateTaskStatusMutation = gql`mutation updateTaskStatus($id: ID!, $taskId: ID!, $status: ProcessStatus!) {
  updateTaskStatus(id: $id, taskId: $taskId, status: $status) {
    ...TaskFragment
  }
} ${TaskFragment}`;

export const DeleteTaskMutation = gql`mutation deleteTask($id: ID!, $taskId: ID!) {
  deleteTask(id: $id, taskId: $taskId) {
    ...TaskFragment
  }
} ${TaskFragment}`;

export const AssignTaskMutation = gql`mutation assignTask($id: ID!, $taskId: ID!, $assigneeId: ID!) {
  assignTask(id: $id, taskId: $taskId, assigneeId: $assigneeId) {
    ...TaskFragment
  }
} ${TaskFragment}`;

// subscription
export const UpdatedTaskSubscription = gql`subscription updatedTask {
  updatedTask {
    mutation
    node {
      id
      name
      status
    }
  }
}`;
