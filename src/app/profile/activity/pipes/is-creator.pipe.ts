import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isCreator'
})
export class IsCreatorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
