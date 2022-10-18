import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[appSsnMask]'
})
export class SsnMaskDirective {

  constructor(private element: ElementRef, private renderer: Renderer2, private ngControl: NgControl) {
  }

  @HostListener('keypress', ['$event'])
  handleKeyUp(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event) {
    let newValue = event.clipboardData.getData('Text').replace(/[^\d\*]/g, '');
    let myComp = this;
    setTimeout(function () {
      myComp.ngControl.control.setValue(newValue);
    }, 0);
  }

  @HostListener('blur', ['$event'])
  handleBlur(event) {
    if (event.target.value.length < 9) {
      this.ngControl.control.setValue('');
    }
  }


}
