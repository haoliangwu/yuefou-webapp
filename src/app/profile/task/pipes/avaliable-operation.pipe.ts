import { Pipe, PipeTransform } from '@angular/core';
import { Task, ProgressStatus } from '../../../model';
import * as R from 'ramda';
import { isDone, isStop, isInit, isPending } from '../../../utils';

export enum TaskOperation {
  ASSIGN = 'assign',
  START = 'start',
  DONE = 'done',
  STOP = 'stop',
  REOPEN = 'reopen'
}

// 当任务为 非完成 或 非停止 状态 则可以 指派
const canAssign = R.complement(R.either(isDone, isStop));
// 当任务为 初始 状态 则可以 开始
const canStart = isInit;
// 当任务为 非初始 状态 或 进行状态 则可以 完成
const canDone = R.either(isPending, R.complement(isInit));
// 当任务为 初始 状态 或 进行状态 则可以 结束
const canStop = R.either(isPending, isInit);
// 当任务为 完成 状态 则可以 重新开始
const canReopen = isDone;

@Pipe({
  name: 'avaliableOperation'
})
export class AvaliableOperationPipe implements PipeTransform {

  transform(task: Task, operation: TaskOperation): any {
    switch (operation) {
      case TaskOperation.ASSIGN:
      return canAssign(task);
      case TaskOperation.START:
      return canStart(task);
      case TaskOperation.DONE:
      return canDone(task);
      case TaskOperation.STOP:
      return canStop(task);
      case TaskOperation.REOPEN:
      return canReopen(task);
      default:
      return false;
    }
  }

}
