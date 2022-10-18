import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: 'p-dialog'
})
export class DialogDirective {

  @Input() descriptionId: string;

  closeDialogButton: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('onShow') onShow() {
    this.prepareFocus();
    this.setFocusOnCloseButton();
  }

  setFocusOnCloseButton() {
    if (this.closeDialogButton) {
      let closeButton = this.closeDialogButton;
      setTimeout(function () {
        closeButton.focus();
      }, 0);
    }
  }

  prepareFocus() {
    this.closeDialogButton = this.elRef.nativeElement.querySelector('.p-dialog-header-icon');
    if (this.closeDialogButton) {
      this.renderer.setAttribute(this.closeDialogButton, 'tabindex', '0');
      this.renderer.setAttribute(this.closeDialogButton, 'aria-label', 'Close Button.');
      this.renderer.addClass(this.closeDialogButton, 'usa-button');
      this.renderer.addClass(this.closeDialogButton, 'usa-button--outline');
    }
    if (this.descriptionId) {
      this.renderer.setAttribute(this.closeDialogButton, 'aria-describedby', this.descriptionId);
    }

    let dialog = this.elRef.nativeElement.querySelector('.p-dialog');
    this.renderer.setAttribute(dialog, 'aria-modal', 'true');
  }

}
