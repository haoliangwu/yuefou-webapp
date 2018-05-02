import gql from 'graphql-tag';

export const CosConfigFragment = gql`fragment CosConfigFragment on CosConfig {
  bucket
  region
  appId
}`;

export const AppConfigQuery = gql`query appConfigQuery {
  config {
    env
    cos {
      ...CosConfigFragment
    }
  }
} ${CosConfigFragment}`;
