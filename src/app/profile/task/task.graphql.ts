import gql from 'graphql-tag';

// fragment
export const TaskFragment = gql`fragment TaskFragment on ActivityTask{id name status assignee{id name}activity{id title participants{id name}creator{id name}}}`;

const withTaskFragment = query => gql`${query} ${TaskFragment}`;

// query
export const TasksQuery = withTaskFragment(`{tasks{...TaskFragment}}`);

export const TaskQuery = withTaskFragment(`query task($id:ID!) {task(id:$id) {...TaskFragment}}`);

// mutation
export const CreateTaskMutation = withTaskFragment(`mutation createTask($id: ID!, $task:CreateTaskInput!){createTask(task:$task,id:$id){...TaskFragment}}`);

export const UpdateTaskMutation = withTaskFragment(`mutation updateTask($id:ID!,$task:UpdateTaskInput!){updateTask(id:$id,task:$task){...TaskFragment}}`);

export const UpdateTaskStatusMutation = withTaskFragment(`mutation updateTaskStatus($id:ID!,$taskId:ID!,$status:ProcessStatus!){updateTaskStatus(id:$id,taskId:$taskId,status:$status){...TaskFragment}}`);

export const DeleteTaskMutation = withTaskFragment(`mutation deleteTask($id:ID!,$taskId:ID!){deleteTask(id:$id,taskId:$taskId){...TaskFragment}}`);

export const AssignTaskMutation = withTaskFragment(`mutation assignTask($id:ID!,$taskId:ID!,$assigneeId:ID!){assignTask(id:$id,taskId:$taskId,assigneeId:$assigneeId){...TaskFragment}}`);

// subscription
export const UpdatedTaskSubscription = gql`subscription{updatedTask{mutation node{id name status}}}`;
