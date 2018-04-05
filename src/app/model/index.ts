import { ProcessStatus } from './graphql';

export type ID = string;

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

export enum RecipeTagType {
  TASTE = 'TASTE',
  METHOD = 'METHOD',
  STYLE = 'STYLE'
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

export interface Recipe {
  id: string;
  name: string;
  time: number;
  desc?: string;
  avatar?: string;
  tags?: RecipeTag[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface RecipeTag extends Tag {
  type: RecipeTagType;
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

export interface UpdateMeta<T> {
  create?: Array<T | Partial<T>>;
  update?: Array<T>;
  delete?: Array<ID>;
}

export enum UpdateOperation {
  CREATE = 'create',
  DELETE = 'delete',
  UPDATE = 'update',
  CANCEL = 'cancel',
  SAVE = 'save'
}

export interface UpdateOperationPayload<T = any> {
  operation: UpdateOperation;
  data?: T;
  fake?: boolean;
}
