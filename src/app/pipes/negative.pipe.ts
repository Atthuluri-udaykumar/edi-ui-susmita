import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negative'
})
export class NegativePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value?.charAt(0) === '-' ?
      '(' + value.substring(1, value.length) + ')' :
      value;
  }
}
