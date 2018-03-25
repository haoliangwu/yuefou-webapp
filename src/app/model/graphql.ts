/* tslint:disable */
//  This file was automatically generated and should not be edited.

export enum ProcessStatus {
  DONE = "DONE",
  INIT = "INIT",
  PENDING = "PENDING",
  STOP = "STOP",
}


export enum ActivityType {
  HOST = "HOST",
  POTLUCK = "POTLUCK",
  TASK = "TASK",
}


export interface CreateActivityInput {
  title: string,
  type?: ActivityType | null,
  location?: string | null,
  desc?: string | null,
  startedAt?: string | null,
  endedAt?: string | null,
};

export interface UpdateActivityInput {
  id: string,
  title?: string | null,
  location?: string | null,
  desc?: string | null,
  startedAt?: string | null,
  endedAt?: string | null,
  status?: ProcessStatus | null,
};

export enum MutationType {
  CREATED = "CREATED",
  DELETED = "DELETED",
  UPDATED = "UPDATED",
}


export interface activitiesQuery {
  activities:  Array< {
    id: string,
    title: string,
    desc: string | null,
    status: ProcessStatus | null,
    type: ActivityType,
    location: string,
    startedAt: string,
    endedAt: string,
    creator:  {
      id: string,
      name: string,
    },
    participants:  Array< {
      id: string,
      name: string,
    } > | null,
    tasks:  Array< {
      id: string,
      name: string,
    } > | null,
  } >,
};

export interface activityQueryVariables {
  id: string,
};

export interface activityQuery {
  activity:  {
    id: string,
    title: string,
    desc: string | null,
    status: ProcessStatus | null,
    type: ActivityType,
    location: string,
    startedAt: string,
    endedAt: string,
    creator:  {
      id: string,
      name: string,
    },
    participants:  Array< {
      id: string,
      name: string,
    } > | null,
    tasks:  Array< {
      id: string,
      name: string,
    } > | null,
  } | null,
};

export interface createActivityMutationVariables {
  activity: CreateActivityInput,
};

export interface createActivityMutation {
  createActivity:  {
    id: string,
    title: string,
    desc: string | null,
    status: ProcessStatus | null,
    type: ActivityType,
    location: string,
    startedAt: string,
    endedAt: string,
    creator:  {
      id: string,
      name: string,
    },
    participants:  Array< {
      id: string,
      name: string,
    } > | null,
    tasks:  Array< {
      id: string,
      name: string,
    } > | null,
  },
};

export interface updateActivityMutationVariables {
  activity: UpdateActivityInput,
};

export interface updateActivityMutation {
  updateActivity:  {
    id: string,
    title: string,
    desc: string | null,
    status: ProcessStatus | null,
    type: ActivityType,
    location: string,
    startedAt: string,
    endedAt: string,
    creator:  {
      id: string,
      name: string,
    },
    participants:  Array< {
      id: string,
      name: string,
    } > | null,
    tasks:  Array< {
      id: string,
      name: string,
    } > | null,
  },
};

export interface deleteActivityMutationVariables {
  id: string,
};

export interface deleteActivityMutation {
  deleteActivity:  {
    id: string,
  },
};

export interface attendActivityMutationVariables {
  id: string,
};

export interface attendActivityMutation {
  attendActivity:  {
    id: string,
    title: string,
    desc: string | null,
    status: ProcessStatus | null,
    type: ActivityType,
    location: string,
    startedAt: string,
    endedAt: string,
    creator:  {
      id: string,
      name: string,
    },
    participants:  Array< {
      id: string,
      name: string,
    } > | null,
    tasks:  Array< {
      id: string,
      name: string,
    } > | null,
  },
};

export interface quitActivityMutationVariables {
  id: string,
};

export interface quitActivityMutation {
  quitActivity:  {
    id: string,
    title: string,
    desc: string | null,
    status: ProcessStatus | null,
    type: ActivityType,
    location: string,
    startedAt: string,
    endedAt: string,
    creator:  {
      id: string,
      name: string,
    },
    participants:  Array< {
      id: string,
      name: string,
    } > | null,
    tasks:  Array< {
      id: string,
      name: string,
    } > | null,
  },
};

export interface updatedTaskSubscription {
  updatedTask:  {
    mutation: MutationType,
    node:  {
      id: string,
      name: string,
      status: ProcessStatus,
    } | null,
  } | null,
};

export interface ActivityFragmentFragment {
  id: string,
  title: string,
  desc: string | null,
  status: ProcessStatus | null,
  type: ActivityType,
  location: string,
  startedAt: string,
  endedAt: string,
  creator:  {
    id: string,
    name: string,
  },
  participants:  Array< {
    id: string,
    name: string,
  } > | null,
  tasks:  Array< {
    id: string,
    name: string,
  } > | null,
};

export interface TaskFragmentFragment {
  id: string,
  name: string,
  status: ProcessStatus,
  assignee:  {
    id: string,
    name: string,
  } | null,
  activity:  {
    id: string,
    title: string,
    participants:  Array< {
      id: string,
      name: string,
    } > | null,
    creator:  {
      id: string,
      name: string,
    },
  } | null,
};
