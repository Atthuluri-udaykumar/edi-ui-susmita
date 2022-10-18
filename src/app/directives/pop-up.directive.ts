import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appPopUp]'
})
export class PopUpDirective {

  newWindow = null;

  @Input() url: string;
  @Input() width: number;
  @Input() height: number;

  constructor() {
  }

  @HostListener('click') onClick() {
    this.popUpWin(this.url, this.width, this.height);
  }

  popUpWin(url, w, h) {

    this.closeWin();

    if (!w) {
      w = 500; // default width
    }
    if (!h) {
      h = 400; // default height
    }

    // Fixes dual-screen position                         Most browsers      Firefox
    const dualScreenLeft = window.screenLeft;
    const dualScreenTop = window.screenTop;

    const width = window.innerWidth ? window.innerWidth :
      document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight :
      document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;

    const tools = 'resizable,toolbar=no,location=no,scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left;

    this.newWindow = window.open(url, '_blank', tools);
    this.newWindow.focus();
  }

  closeWin() {
    if (this.newWindow != null) {
      if (!this.newWindow.closed) {
        this.newWindow.close();
      }
    }
  }

}
