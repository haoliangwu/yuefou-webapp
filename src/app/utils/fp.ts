import * as R from 'ramda';

export const isNilOrEmpty = R.either(R.isNil, R.isEmpty);

export const isExisted = R.has('id');
export const isNotExisted = R.complement(isExisted);
