import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  printFinished: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  finishedHandler: any;

  constructor(@Inject(DOCUMENT) private document) {

    let isIE = /*@cc_on!@*/false || !!document['documentMode']; // Detect if it is IE
    if (isIE) {
      this.finishedHandler = this.handleFinished.bind(this);
      window.onafterprint = this.afterPrint.bind(this);
    } else {
      let thisService = this;

      if (window.matchMedia) {
        let mediaQueryList = window.matchMedia('print');

        mediaQueryList.addListener(function (mql) {
          if (mql.matches) {
          } else {
            thisService.printFinished.next(true);
          }
        });
      }
    }
  }

  handleFinished() {
    console.log('Finished Printing');
    this.document.removeEventListener('mousemove', this.finishedHandler);
    this.document.removeEventListener('keydown', this.finishedHandler);
    this.printFinished.next(true);
  }

  afterPrint() {
    let thisService = this;
    setTimeout(function () {
        thisService.document.addEventListener('mousemove', thisService.finishedHandler);
        thisService.document.addEventListener('keydown', thisService.finishedHandler);
      }
      , 501);
  }


}
