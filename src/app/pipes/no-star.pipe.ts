import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'nostar'})
export class NoStarPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    let newStr = value.replace('* ', '');
    return newStr;
  }
}
