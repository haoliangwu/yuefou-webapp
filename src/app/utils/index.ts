import { ProcessStatus } from '../model';
import * as R from 'ramda';

export const isInit = R.propEq('status', ProcessStatus.INIT);
export const isDone = R.propEq('status', ProcessStatus.DONE);
export const isStop = R.propEq('status', ProcessStatus.STOP);
export const isPending = R.propEq('status', ProcessStatus.PENDING);

export const translateProcessStatus = R.cond([
  [R.equals(ProcessStatus.INIT), R.always('初始状态')],
  [R.equals(ProcessStatus.PENDING), R.always('执行状态')],
  [R.equals(ProcessStatus.DONE), R.always('完成状态')],
  [R.equals(ProcessStatus.STOP), R.always('终止状态')],
]);
