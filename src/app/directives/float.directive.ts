import {AfterViewInit, Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFloat]'
})
export class FloatDirective implements AfterViewInit {

  elementOffsetTop: Number;
  element: any;
  initialOffsetTop: Number;

  @HostListener('window:scroll', []) onScroll() {
    this.myFunction();
  }


  constructor(public el: ElementRef, public renderer: Renderer2) {
    this.element = el.nativeElement;
    this.renderer.removeClass(this.element, 'sticky');
  }

  ngAfterViewInit(): void {
    this.initialOffsetTop = this.element.offsetTop;
  }

  myFunction() {
    this.elementOffsetTop = this.element.offsetTop;
    if (window.pageYOffset >= this.initialOffsetTop && window.pageYOffset >= this.elementOffsetTop) {
      this.renderer.addClass(this.element, 'sticky');
    }
    if (window.pageYOffset < this.initialOffsetTop) {
      this.renderer.removeClass(this.element, 'sticky');
    }

  }

}
