import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: 'p-accordionTab'
})
export class AccordionDirective implements AfterViewInit {

  @Input('descriptionId') descriptionId: string;

  tab: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.tab = this.elRef.nativeElement.children[0].children[0];
    this.renderer.setAttribute(this.tab, 'aria-describedby', this.descriptionId);
  }

  @HostListener('keydown', ['$event']) onKey(event) {
    if (event.target.id.indexOf('p-accordiontab-') >= 0) {
      if (event.keyCode === 32) {
        let tabHtml = this.tab as HTMLElement;
        tabHtml.click();
        event.preventDefault();
      }
    }
  }

  @HostListener('focus', ['$event']) onFocus(event) {
    console.log('got the focus');
  }

}
