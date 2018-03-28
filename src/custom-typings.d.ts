import * as R from 'ramda';
import { FetchResult } from 'apollo-link';

// augment ramda
declare module "ramda" {
  interface Static {
    __: any;
  }
}

export type UpdateFetchResult<T> = FetchResult & {
  data: T
}
