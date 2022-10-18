import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'asterisk'})
export class AsteriskPipe implements PipeTransform {
  transform(value: string, type = 'all'): string {
    let newStr = '';
    if (value) {
      if (type === 'all') {
        newStr = Array(value.length + 1).join('*');
      }
      if (type === 'email') {
        let atIndex = value.indexOf('@');
        newStr = value.charAt(0) + Array(value.substring(1, atIndex - 1).length + 1).join('*') + value.substring(atIndex - 1);
      }
      if (type === 'phone') {
        newStr = '(***) ***-' + value.substring(value.length - 4);
      }
      if (type === 'account') {
        newStr = Array(value.length - 3).join('X') + value.substring(value.length - 4);
      }
    }
    return newStr;
  }
}
