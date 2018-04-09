import gql from 'graphql-tag';
import { PageInfoFragment, TagFragment } from '../../shared/graphql';

// fragment
export const RecipeFragment = gql`fragment RecipeFragment on Recipe {
  id
  name
  time
  desc
  avatar
  tags {
    ...TagFragment
  }
} ${TagFragment}`;

// query
export const RecipesQuery = gql`query recipes {
  recipes{
    ...RecipeFragment
  }
} ${RecipeFragment}`;

export const RecipesConnection = gql`query recipesConnection($pagination: ForwardPaginationInput!) {
  recipesConnection(pagination: $pagination){
    edges {
      node {
        ...RecipeFragment
      }
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
} ${RecipeFragment} ${PageInfoFragment}`;

export const RecipeQuery = gql`query recipe($id: ID!) {
  recipe(id: $id){
    ...RecipeFragment
  }
} ${RecipeFragment}`;

// mutation
export const CreateRecipeMutation = gql`mutation createRecipe($recipe: CreateRecipeInput!, $tagsMeta: TagsMetaInput) {
  createRecipe(recipe: $recipe, tagsMeta: $tagsMeta) {
    ...RecipeFragment
  }
} ${RecipeFragment}`;

export const UpdateRecipeMutation = gql`mutation updateRecipe($recipe: UpdateRecipeInput!, $tagsMeta: TagsMetaInput) {
  updateRecipe(recipe: $recipe, tagsMeta: $tagsMeta) {
    ...RecipeFragment
  }
} ${RecipeFragment}`;

export const DeleteRecipeMutation = gql`mutation deleteRecipe($id: ID!) {
  deleteRecipe(id: $id) {
    id
  }
} ${RecipeFragment}`;

export const UploadRecipePictureMutation = gql`mutation uploadRecipePicture($id: ID!, $file: Upload!) {
  uploadRecipePicture(id: $id, file: $file) {
    ...RecipeFragment
  }
} ${RecipeFragment}`;
