import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appCaption]'
})
export class CaptionDirective implements AfterViewInit {

  element: any;

  @Input() appCaption: string;

  constructor(el: ElementRef, public renderer: Renderer2) {
    this.element = el.nativeElement;
  }

  ngAfterViewInit(): void {

    let tableElement = this.element.querySelector('table');
    let title = this.renderer.createElement('caption');
    let titleText = this.renderer.createText(this.appCaption);
    this.renderer.appendChild(title, titleText);
    if (tableElement) {
      this.renderer.appendChild(tableElement, title);
    }
  }

}
