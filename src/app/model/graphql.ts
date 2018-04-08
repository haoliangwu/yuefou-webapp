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


export interface ForwardPaginationInput {
  first: number,
  after?: string | null,
  skip?: number | null,
};

export interface CreateActivityInput {
  title: string,
  type?: ActivityType | null,
  location?: string | null,
  desc?: string | null,
  startedAt?: string | null,
  endedAt?: string | null,
};

export interface TasksMetaInput {
  create?: Array< CreateTaskInput > | null,
  update?: Array< UpdateTaskInput > | null,
  delete?: Array< string > | null,
};

export interface CreateTaskInput {
  name: string,
};

export interface UpdateTaskInput {
  id: string,
  name?: string | null,
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

export interface CreateRecipeInput {
  name: string,
  time: number,
  desc?: string | null,
};

export interface TagsMetaInput {
  create?: Array< CreateTagInput > | null,
  connect?: Array< UpdateTagInput > | null,
  disconnect?: Array< UpdateTagInput > | null,
};

export interface CreateTagInput {
  name: string,
  category?: TagCategory | null,
  default?: boolean | null,
};

export enum TagCategory {
  DEFAULT = "DEFAULT",
  RECIPE = "RECIPE",
}


export interface UpdateTagInput {
  id: string,
  name?: string | null,
  category?: TagCategory | null,
  default?: boolean | null,
};

export interface UpdateRecipeInput {
  id: string,
  name?: string | null,
  time?: number | null,
  desc?: string | null,
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
      status: ProcessStatus | null,
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
    } > | null,
  } >,
};

export interface activitiesConnectionQueryVariables {
  pagination?: ForwardPaginationInput | null,
};

export interface activitiesConnectionQuery {
  activitiesConnection:  {
    // A list of edges.
    edges:  Array< {
      // The item at the end of the edge.
      node:  {
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
          status: ProcessStatus | null,
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
        } > | null,
      },
    } | null >,
    // Information to aid in pagination.
    pageInfo:  {
      // When paginating forwards, are there more items?
      hasNextPage: boolean,
      // When paginating backwards, are there more items?
      hasPreviousPage: boolean,
      // When paginating forwards, the cursor to continue.
      endCursor: string | null,
      // When paginating backwards, the cursor to continue.
      startCursor: string | null,
    },
  },
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
      status: ProcessStatus | null,
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
    } > | null,
  } | null,
};

export interface createActivityMutationVariables {
  activity: CreateActivityInput,
  tasksMeta?: TasksMetaInput | null,
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
      status: ProcessStatus | null,
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
    } > | null,
  },
};

export interface updateActivityMutationVariables {
  activity: UpdateActivityInput,
  tasksMeta?: TasksMetaInput | null,
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
      status: ProcessStatus | null,
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
    } > | null,
  },
};

export interface deleteActivityMutationVariables {
  id: string,
};

export interface deleteActivityMutation {
  deleteActivity:  {
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
      status: ProcessStatus | null,
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
    } > | null,
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
      status: ProcessStatus | null,
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
      status: ProcessStatus | null,
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
    } > | null,
  },
};

export interface recipesQuery {
  recipes:  Array< {
    id: string,
    name: string,
    time: number | null,
    desc: string | null,
    avatar: string | null,
    tags:  Array< {
      id: string,
      name: string,
      category: TagCategory,
      default: boolean | null,
    } > | null,
  } >,
};

export interface recipesConnectionQueryVariables {
  pagination: ForwardPaginationInput,
};

export interface recipesConnectionQuery {
  recipesConnection:  {
    // A list of edges.
    edges:  Array< {
      // The item at the end of the edge.
      node:  {
        id: string,
        name: string,
        time: number | null,
        desc: string | null,
        avatar: string | null,
        tags:  Array< {
          id: string,
          name: string,
          category: TagCategory,
          default: boolean | null,
        } > | null,
      },
    } | null >,
    // Information to aid in pagination.
    pageInfo:  {
      // When paginating forwards, are there more items?
      hasNextPage: boolean,
      // When paginating backwards, are there more items?
      hasPreviousPage: boolean,
      // When paginating forwards, the cursor to continue.
      endCursor: string | null,
      // When paginating backwards, the cursor to continue.
      startCursor: string | null,
    },
  },
};

export interface recipeQueryVariables {
  id: string,
};

export interface recipeQuery {
  recipe:  {
    id: string,
    name: string,
    time: number | null,
    desc: string | null,
    avatar: string | null,
    tags:  Array< {
      id: string,
      name: string,
      category: TagCategory,
      default: boolean | null,
    } > | null,
  } | null,
};

export interface createRecipeMutationVariables {
  recipe: CreateRecipeInput,
  tagsMeta?: TagsMetaInput | null,
};

export interface createRecipeMutation {
  createRecipe:  {
    id: string,
    name: string,
    time: number | null,
    desc: string | null,
    avatar: string | null,
    tags:  Array< {
      id: string,
      name: string,
      category: TagCategory,
      default: boolean | null,
    } > | null,
  },
};

export interface updateRecipeMutationVariables {
  recipe: UpdateRecipeInput,
  tagsMeta?: TagsMetaInput | null,
};

export interface updateRecipeMutation {
  updateRecipe:  {
    id: string,
    name: string,
    time: number | null,
    desc: string | null,
    avatar: string | null,
    tags:  Array< {
      id: string,
      name: string,
      category: TagCategory,
      default: boolean | null,
    } > | null,
  },
};

export interface deleteRecipeMutationVariables {
  id: string,
};

export interface deleteRecipeMutation {
  deleteRecipe:  {
    id: string,
    name: string,
    time: number | null,
    desc: string | null,
    avatar: string | null,
    tags:  Array< {
      id: string,
      name: string,
      category: TagCategory,
      default: boolean | null,
    } > | null,
  },
};

export interface uploadRecipePictureMutationVariables {
  id: string,
  file: string,
};

export interface uploadRecipePictureMutation {
  uploadRecipePicture:  {
    id: string,
    name: string,
    time: number | null,
    desc: string | null,
    avatar: string | null,
    tags:  Array< {
      id: string,
      name: string,
      category: TagCategory,
      default: boolean | null,
    } > | null,
  },
};

export interface tasksQuery {
  tasks:  Array< {
    id: string,
    name: string,
    status: ProcessStatus | null,
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
  } >,
};

export interface tasksConnectionQueryVariables {
  pagination?: ForwardPaginationInput | null,
};

export interface tasksConnectionQuery {
  tasksConnection:  {
    // A list of edges.
    edges:  Array< {
      // The item at the end of the edge.
      node:  {
        id: string,
        name: string,
        status: ProcessStatus | null,
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
      },
    } | null >,
    // Information to aid in pagination.
    pageInfo:  {
      // When paginating forwards, are there more items?
      hasNextPage: boolean,
      // When paginating backwards, are there more items?
      hasPreviousPage: boolean,
      // When paginating forwards, the cursor to continue.
      endCursor: string | null,
      // When paginating backwards, the cursor to continue.
      startCursor: string | null,
    },
  } | null,
};

export interface taskQueryVariables {
  id: string,
};

export interface taskQuery {
  task:  {
    id: string,
    name: string,
    status: ProcessStatus | null,
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
  } | null,
};

export interface createTaskMutationVariables {
  id: string,
  task: CreateTaskInput,
};

export interface createTaskMutation {
  createTask:  {
    id: string,
    name: string,
    status: ProcessStatus | null,
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
  },
};

export interface updateTaskMutationVariables {
  id: string,
  task: UpdateTaskInput,
};

export interface updateTaskMutation {
  updateTask:  {
    id: string,
    name: string,
    status: ProcessStatus | null,
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
  },
};

export interface updateTaskStatusMutationVariables {
  id: string,
  taskId: string,
  status: ProcessStatus,
};

export interface updateTaskStatusMutation {
  updateTaskStatus:  {
    id: string,
    name: string,
    status: ProcessStatus | null,
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
  },
};

export interface deleteTaskMutationVariables {
  id: string,
  taskId: string,
};

export interface deleteTaskMutation {
  deleteTask:  {
    id: string,
    name: string,
    status: ProcessStatus | null,
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
  },
};

export interface assignTaskMutationVariables {
  id: string,
  taskId: string,
  assigneeId: string,
};

export interface assignTaskMutation {
  assignTask:  {
    id: string,
    name: string,
    status: ProcessStatus | null,
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
  },
};

export interface updatedTaskSubscription {
  updatedTask:  {
    mutation: MutationType,
    node:  {
      id: string,
      name: string,
      status: ProcessStatus | null,
    } | null,
  } | null,
};

export interface tagsQueryVariables {
  category?: TagCategory | null,
};

export interface tagsQuery {
  tags:  Array< {
    id: string,
    name: string,
    category: TagCategory,
    default: boolean | null,
  } >,
};

export interface tagQueryVariables {
  id: string,
};

export interface tagQuery {
  tag:  {
    id: string,
    name: string,
    category: TagCategory,
    default: boolean | null,
  } | null,
};

export interface createTagMutationVariables {
  tag: CreateTagInput,
};

export interface createTagMutation {
  createTag:  {
    id: string,
    name: string,
    category: TagCategory,
    default: boolean | null,
  },
};

export interface updateTagMutationVariables {
  tag: UpdateTagInput,
};

export interface updateTagMutation {
  updateTag:  {
    id: string,
    name: string,
    category: TagCategory,
    default: boolean | null,
  },
};

export interface deleteTagMutationVariables {
  id: string,
};

export interface deleteTagMutation {
  deleteTag:  {
    id: string,
    name: string,
    category: TagCategory,
    default: boolean | null,
  },
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
    status: ProcessStatus | null,
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
  } > | null,
};

export interface RecipeFragmentFragment {
  id: string,
  name: string,
  time: number | null,
  desc: string | null,
  avatar: string | null,
  tags:  Array< {
    id: string,
    name: string,
    category: TagCategory,
    default: boolean | null,
  } > | null,
};

export interface TaskFragmentFragment {
  id: string,
  name: string,
  status: ProcessStatus | null,
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

export interface PageInfoFragmentFragment {
  // When paginating forwards, are there more items?
  hasNextPage: boolean,
  // When paginating backwards, are there more items?
  hasPreviousPage: boolean,
  // When paginating forwards, the cursor to continue.
  endCursor: string | null,
  // When paginating backwards, the cursor to continue.
  startCursor: string | null,
};

export interface TagFragmentFragment {
  id: string,
  name: string,
  category: TagCategory,
  default: boolean | null,
};
