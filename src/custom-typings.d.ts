import * as R from 'ramda';

// augment ramda
declare module "ramda" {
  interface Static {
    __: any;
  }
}
