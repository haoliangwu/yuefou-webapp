import { ProcessStatus } from './graphql';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export enum ActivityType {
  HOST = 'HOST',
  TASK = 'TASK',
  POTLUCK = 'POTLUCK'
}

export interface Activity {
  id: string;
  title: string;
  desc: string;
  status: ProcessStatus;
  type: ActivityType;
  startedAt: string;
  endedAt: string;
  location: string;
  creator: {
    id: string
    name: string
  };
  participants: User[];
  tasks: any[];
}

export interface Task {
  id: string;
  name: string;
  desc: string;
  status: ProcessStatus;
  activity: Activity;
  assignee: User;
}

export * from './graphql';

export interface AppConfig {
  language: {
    available: string[]
    default: string
  };
  pagination: {
    first: number
  };
}

export interface DataId {
  id: string;
  __typename: string;
}

export type DataIdFromObjectResolver = (o: DataId) => any;

export enum UpdateOperation {
  CREATE = 'create',
  DELETE = 'delete',
  UPDATE = 'update'
}

export interface UpdateOperationPayload<T> {
  operation: UpdateOperation;
  data: T;
  fake?: boolean;
}
