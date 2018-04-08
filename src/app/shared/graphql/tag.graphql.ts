import gql from 'graphql-tag';

// fragment
export const TagFragment = gql`fragment TagFragment on Tag {
  id
  name
  category
  default
}`;

// query
export const TagsQuery = gql`query tags($category: TagCategory) {
  tags(category: $category) {
    ...TagFragment
  }
} ${TagFragment}`;

export const TagQuery = gql`query tag($id: ID!) {
  tag(id: $id) {
    ...TagFragment
  }
} ${TagFragment}`;

// mutation
export const CreateTagMutation = gql`mutation createTag($tag: CreateTagInput!) {
  createTag(tag: $tag) {
    ...TagFragment
  }
} ${TagFragment}`;

export const UpdateTagMutation = gql`mutation updateTag($tag: UpdateTagInput!) {
  updateTag(tag: $tag) {
    ...TagFragment
  }
} ${TagFragment}`;

export const DeleteTagMutation = gql`mutation deleteTag($id: ID!) {
  deleteTag(id: $id) {
    ...TagFragment
  }
} ${TagFragment}`;
