import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeReadable'
})
export class TimeReadablePipe implements PipeTransform {

  transform(time: number, unit = 'minute'): any {
    switch (unit) {
      case 'minute':

        if (time > 60) {
          return '大于1小时';
        } else if (time === 60) {
          return '1小时';
        } else if (time < 60 && time > 0) {
          return `${time}分钟`;
        }

        break;
      default:
        break;
    }
  }

}
