import * as R from 'ramda';

import { Pipe, PipeTransform } from '@angular/core';
import { Task, ProcessStatus } from '../../../model';

@Pipe({
  name: 'taskStatusSuffix'
})
export class TaskStatusSuffixPipe implements PipeTransform {
  transform(task: Task): any {
    switch (task.status) {
      case ProcessStatus.INIT:
        return `${task.name}(未开始)`;
      case ProcessStatus.PENDING:
        return `${task.name}(进行中)`;
      case ProcessStatus.DONE:
        return `${task.name}(已结束)`;
      case ProcessStatus.STOP:
        return `${task.name}(已终止)`;
      default:
        return task.name;
    }
  }
}
