import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: 'p-overlayPanel'
})
export class OverlayDirective {

  @Input('descriptionId') descriptionId: string;
  @Input('elementToFocusWhenHide') elementToFocusWhenHide: any;

  closeOverlayButton: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('onShow') onShow() {
    this.prepareFocus();
    let panel = this.elRef.nativeElement.querySelector('.p-overlaypanel');
    this.renderer.setStyle(panel, 'display', 'none');
    let closeButton = this.closeOverlayButton;
    let thiRenderer = this.renderer;
    setTimeout(function () {
      if (panel.style.left.indexOf('-') >= 0) {
        thiRenderer.setStyle(panel, 'left', '10%'); // For some reason the left style is wrongly calculated
        thiRenderer.setStyle(panel, 'display', 'block');
      }else{
        thiRenderer.setStyle(panel, 'display', 'block');
      }
      closeButton.focus();
    }, 50); // Requires a few milliseconds before it loads the actual component
    // if we don't give it enough time it won't read the aria-describedby
  }

  @HostListener('onHide') onHide() {
    if (this.elementToFocusWhenHide) {
      this.elementToFocusWhenHide.focus();
    }
  }

  prepareFocus() {
    this.closeOverlayButton = this.elRef.nativeElement.querySelector('.p-overlaypanel-close');
    this.renderer.setAttribute(this.closeOverlayButton, 'aria-label', 'Close Button.');
    if (this.descriptionId) {
      this.renderer.setAttribute(this.closeOverlayButton, 'aria-describedby', this.descriptionId);
    }
  }

}
