import { Directive, ElementRef, HostListener } from '@angular/core';
import { CustomRenderer } from '../services/custom-renderer.service';

@Directive({
  selector: 'input,select,p-calendar,p-inputMask,textarea'
})
export class BlurForwarderDirective {
  constructor(private elRef: ElementRef, private renderer: CustomRenderer) {
  }

  @HostListener('blur', ['$event'])
  onBlur(event) {
    this.renderer.invokeElementMethod(this.elRef,
      'dispatchEvent',
      [new CustomEvent('input-blur', { bubbles: true })]);
    // // or just
    // this.elRef.nativeElement.dispatchEvent(new CustomEvent('input-blur', {bubbles: true}));
    // console.log('Something happens');
    // if you don't care about webworker compatibility
  }

  @HostListener('onBlur', ['$event'])
  onPrimeBlur(event) {
    // if (this.elRef.nativeElement.tagName.toLowerCase() !== 'p-calendar') {
    this.renderer.invokeElementMethod(this.elRef,
      'dispatchEvent',
      [new CustomEvent('input-blur', { bubbles: true })]);
    // }
    // or just
    // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
    // if you don't care about webworker compatibility
  }

  // @HostListener('onClose', ['$event'])
  // onPrimeClose(event) {
  //   this.renderer.invokeElementMethod(this.elRef,
  //     'dispatchEvent',
  //     [new CustomEvent('input-blur', {bubbles: true})]);
  //   // or just
  //   // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
  //   // if you don't care about webworker compatibility
  // }
}
