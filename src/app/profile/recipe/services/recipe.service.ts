import { Injectable, Inject } from '@angular/core';
import { Recipe, RecipeTag, RecipeTagType, AppConfig, recipeQuery, recipeQueryVariables, recipesQuery, recipesConnectionQuery, recipesConnectionQueryVariables, ForwardPaginationInput, CreateRecipeInput, createRecipeMutation, createRecipeMutationVariables, UpdateRecipeInput, updateRecipeMutation, updateRecipeMutationVariables, deleteRecipeMutation, deleteRecipeMutationVariables, uploadRecipePictureMutation, uploadRecipePictureMutationVariables, TagCategory, TagsMetaInput } from '../../../model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, switchMap } from 'rxjs/operators';
import { Apollo, QueryRef } from 'apollo-angular';
import { AppConfigToken } from '../../../app.config';
import { RecipesQuery, RecipesConnection, RecipeQuery, CreateRecipeMutation, DeleteRecipeMutation, UpdateRecipeMutation, UploadRecipePictureMutation } from '../recipe.graphql';
import { TagService } from '../../../shared/services/tag.service';
import { RefetchQueryDescription } from 'apollo-client/core/watchQueryOptions';
import ImageCompressor from 'image-compressor.js';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class RecipeService {
  private pagination: ForwardPaginationInput = this.appConfig.pagination;

  constructor(
    private apollo: Apollo,
    @Inject(AppConfigToken) private appConfig: AppConfig,
    private tagService: TagService
  ) { }

  recipesQuery() {
    return this.apollo.watchQuery<recipesQuery>({
      query: RecipesQuery
    });
  }

  recipes() {
    return this.apollo.query<recipesQuery>({
      query: RecipesQuery
    });
  }

  recipesConnection(pagination: ForwardPaginationInput) {
    this.pagination = pagination;

    return this.apollo.watchQuery<recipesConnectionQuery, recipesConnectionQueryVariables>({
      query: RecipesConnection,
      variables: {
        pagination
      }
    });
  }

  recipesFetchMore(query: QueryRef<recipesConnectionQuery, recipesConnectionQueryVariables>, after: string) {
    query.fetchMore({
      variables: {
        pagination: {
          ...this.appConfig.pagination,
          after
        }
      },
      updateQuery: (prev: recipesConnectionQuery, { fetchMoreResult }) => {
        fetchMoreResult.recipesConnection.edges = [...prev.recipesConnection.edges, ...fetchMoreResult.recipesConnection.edges];

        return fetchMoreResult;
      }
    });
  }

  recipe(id: string) {
    return this.apollo.query<recipeQuery, recipeQueryVariables>({
      query: RecipeQuery,
      variables: {
        id
      }
    });
  }

  create(recipe: CreateRecipeInput, tagsMeta?: TagsMetaInput, updateConnection = true) {
    const refetchQueries = updateConnection ? [{
      query: RecipesConnection,
      variables: {
        pagination: this.pagination
      }
    }] : [{
      query: RecipesQuery
    }];

    return this.apollo.mutate<createRecipeMutation, createRecipeMutationVariables>({
      mutation: CreateRecipeMutation,
      variables: {
        recipe,
        tagsMeta
      },
      refetchQueries
    });
  }

  update(recipe: UpdateRecipeInput, tagsMeta?: TagsMetaInput, updateConnection = true) {
    const refetchQueries = updateConnection ? [{
      query: RecipesConnection,
      variables: {
        pagination: this.pagination
      }
    }] : [{
      query: RecipesQuery
    }];

    return this.apollo.mutate<updateRecipeMutation, updateRecipeMutationVariables>({
      mutation: UpdateRecipeMutation,
      variables: {
        recipe,
        tagsMeta
      },
      refetchQueries
    });
  }

  delete(id: string, updateConnection = true) {
    const refetchQueries = updateConnection ? [{
      query: RecipesConnection,
      variables: {
        pagination: this.pagination
      }
    }] : [{
      query: RecipesQuery
    }];

    return this.apollo.mutate<deleteRecipeMutation, deleteRecipeMutationVariables>({
      mutation: DeleteRecipeMutation,
      variables: {
        id
      },
      refetchQueries
    });
  }

  uploadRecipePicture(id: string, file: File) {
    const compressionFile = new ImageCompressor();

    const compression$ = fromPromise(compressionFile.compress(file, {
      quality: 0.6,
    }));

    return compression$.pipe(
      switchMap(blob => {
        return this.apollo.use('upload').mutate<uploadRecipePictureMutation>({
          mutation: UploadRecipePictureMutation,
          variables: {
            id,
            file: blob
          }
        });
      })
    );
  }

  recipeTags() {
    return this.tagService.tags(TagCategory.RECIPE);
  }
}
