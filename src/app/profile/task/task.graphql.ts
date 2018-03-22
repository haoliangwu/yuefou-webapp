import gql from 'graphql-tag';

// fragment
export const TaskFragment = gql`fragment TaskFragment on ActivityTask{id name status assignee{id}activity{id}}`;

const withTaskFragment = query => gql`${query} ${TaskFragment}`;

// query
export const TasksQuery = gql`{me{id}}`;

export const TaskQuery = gql`{me{id}}`;

// mutation
export const CreateTaskMutation = withTaskFragment(`mutation createTask($id: ID!, $task:CreateTaskInput){createTask(task:$task,id:$id){...TaskFragment}}`);

export const UpdateTaskMutation = withTaskFragment(`mutation updateTask($id:ID!,$task:UpdateTaskInput){updateTask(id:$id,task:$task){...TaskFragment}}`);

export const DeleteTaskMutation = withTaskFragment(`mutation deleteTask($id:ID!,$taskId:ID!){deleteTask(id:$id,taskId:$taskId){...TaskFragment}}`);

export const AssignTaskMutation = withTaskFragment(`mutation assignTask($id:ID!,$taskId:ID!,$assigneeId:ID!){assignTask(id:$id,taskId:$taskId,assigneeId:$assigneeId){...TaskFragment}}`);
