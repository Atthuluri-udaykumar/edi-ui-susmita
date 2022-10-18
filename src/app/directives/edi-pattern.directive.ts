import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[rdsPattern]'
})
export class rdsPatternDirective {

  private regexMap = { // add your own
    words: /[^a-zA-Z]/g,
    integer: /[^0-9]/g
  };

  @Input() rdsPattern: string;

  constructor(private el: ElementRef, private control: NgControl) {
  }

  @HostListener('input', ['$event']) onInput(event) {

    let transformedValue = event.target.value;

    if (transformedValue) {
      transformedValue = transformedValue.replace(this.regexMap[this.rdsPattern], '');
      event.target.value = transformedValue;
    }
  }

}
