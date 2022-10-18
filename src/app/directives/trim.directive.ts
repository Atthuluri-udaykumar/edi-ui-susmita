import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

// Currently required with p-InputMask to avoid unwanted empty spaces
@Directive({
  selector: '[trim]',
})
export class TrimDirective {
  constructor(
    private ngControl: NgControl) { }

  @HostListener("onBlur")
  onBlur() {
    let value = this.ngControl.control.value;

    if(value) {
      value = value.trim();
      this.ngControl.control.setValue(value);
    } else {
        this.ngControl.control.setValue('');
    }

    if(value.includes('-____')){ // it is Zip Code
      value = value.replace('-____','');
      this.ngControl.control.setValue(value);
    }
  }
}