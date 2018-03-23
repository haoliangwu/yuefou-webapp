import * as R from 'ramda';

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

//augment ramda
declare module "ramda" {
  interface Static {
    __(): Function;
  }
}
