import { ProgressStatus } from '../model';
import * as R from 'ramda';

export const isInit = R.propEq('status', ProgressStatus.INIT);
export const isDone = R.propEq('status', ProgressStatus.DONE);
export const isStop = R.propEq('status', ProgressStatus.STOP);
export const isPending = R.propEq('status', ProgressStatus.PENDING);
