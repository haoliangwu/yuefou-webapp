export enum ProcessStatus {
  INIT = 'INIT',
  PENDING = 'PENDING',
  DONE = 'DONE',
  STOP = 'STOP'
}

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
