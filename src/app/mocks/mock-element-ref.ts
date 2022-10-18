import {ElementRef} from '@angular/core';

export class MockElementRef extends ElementRef {
  nativeElement = {
    focus() {
    },
    querySelector(selectors: string) {
      return document.createElement('div');
    }
  };
}
