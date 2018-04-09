import * as R from 'ramda';
import { UpdateMeta } from '../model';

export const isNilOrEmpty = R.either(R.isNil, R.isEmpty);

export const isExisted = R.has('id');
export const isNotExisted = R.complement(isExisted);

export const propId = R.prop('id');
export const pickIdProp = R.pick(['id']);

export const uniqById = R.uniqBy<any, any>(R.prop('id'));
export const propEqById = val => R.propEq('id', val);

export const appendItemAndUniqById = R.curry((item, list: ReadonlyArray<any>) => {
  return uniqById([...list, item]);
});

export const findIndexById = R.curry((val: any, list: ReadonlyArray<any>) => {
  return R.findIndex(propEqById(propId(val)), list);
});

export const removeItemById = R.curry((item: any, list: ReadonlyArray<any>) => {
  const idx = findIndexById(item, list);

  return idx > -1 ? R.remove(idx, 1, list) : [...list];
});

export const formatUpdateMeta = R.evolve<UpdateMeta<any>>({
  connect: R.map(pickIdProp),
  disconnect: R.map(pickIdProp)
});
