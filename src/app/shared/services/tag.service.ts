import * as R from 'ramda';

import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { tagQuery, tagsQuery, tagQueryVariables, createTagMutation, createTagMutationVariables, CreateTagInput, UpdateTagInput, updateTagMutation, updateTagMutationVariables, deleteTagMutation, deleteTagMutationVariables, TagCategory, tagsQueryVariables } from '../../model';
import { TagsQuery, TagQuery, CreateTagMutation, UpdateTagMutation, DeleteTagMutation } from '../graphql';

@Injectable()
export class TagService {

  constructor(
    private apollo: Apollo
  ) { }

  tagsWatch(category?: TagCategory) {
    return this.apollo.watchQuery<tagsQuery, tagsQueryVariables>({
      query: TagsQuery,
      variables: {
        category
      }
    });
  }

  tags(category?: TagCategory) {
    return this.apollo.query<tagsQuery, tagsQueryVariables>({
      query: TagsQuery,
      variables: {
        category
      }
    });
  }

  tagWatch(id: string) {
    return this.apollo.watchQuery<tagQuery, tagQueryVariables>({
      query: TagQuery,
      variables: {
        id
      }
    });
  }

  tag(id: string) {
    return this.apollo.query<tagQuery, tagQueryVariables>({
      query: TagQuery,
      variables: {
        id
      }
    });
  }

  create(tag: CreateTagInput) {
    return this.apollo.mutate<createTagMutation, createTagMutationVariables>({
      mutation: CreateTagMutation,
      variables: {
        tag
      }
    });
  }

  update(tag: UpdateTagInput) {
    return this.apollo.mutate<updateTagMutation, updateTagMutationVariables>({
      mutation: UpdateTagMutation,
      variables: {
        tag
      }
    });
  }

  delete(id: string) {
    return this.apollo.mutate<deleteTagMutation, deleteTagMutationVariables>({
      mutation: DeleteTagMutation,
      variables: {
        id
      }
    });
  }
}
