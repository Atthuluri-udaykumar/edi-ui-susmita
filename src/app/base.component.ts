import {AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {Error} from './model/error.model';

@Component({
  selector: 'app-base',
  template: `
    <div>
      base works!!
    </div>
  `
})
export class BaseComponent implements AfterViewInit {

  errorMsgs: Error[] = [];
  warningMsgs: Error[] = [];
  successMsgs: Error[] = [];

  @ViewChild('mainHeader', {static: true}) mainHeader: ElementRef;

  constructor() {
  }

  ngAfterViewInit(): void {
    if (this.mainHeader && this.errorMsgs.length === 0 && this.warningMsgs.length === 0 && this.successMsgs.length === 0) {
      this.mainHeader.nativeElement.focus();
    }
  }
}
