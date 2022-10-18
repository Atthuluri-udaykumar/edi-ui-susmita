import {AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: 'p-table-old'
})
export class PaginatorDirective implements AfterViewInit, OnChanges {

  @Input() value: any[];

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    // Making table paginator 508 Compliant

    let _this = this;
    setTimeout(function () {
      _this.addLabelGotoPage();
    }, 500);

    let first = this.elRef.nativeElement.querySelector('.p-paginator-first');
    if (first) {
      this.renderer.setAttribute(first, 'aria-label', 'Goto first page');
    }

    let previous = this.elRef.nativeElement.querySelector('.p-paginator-prev');
    if (previous) {
      this.renderer.setAttribute(previous, 'aria-label', 'Goto previous page');
    }

    let next = this.elRef.nativeElement.querySelector('.p-paginator-next');
    if (next) {
      this.renderer.setAttribute(next, 'aria-label', 'Goto next page');
    }


    let last = this.elRef.nativeElement.querySelector('.p-paginator-last');
    if (last) {
      this.renderer.setAttribute(last, 'aria-label', 'Goto last page');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      let curVal = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);

      if (curVal) {
        if (curVal !== prevVal) {
          let _this = this;
          setTimeout(function () {
            _this.addLabelGotoPage();
          }, 500);
        }
      }
    }
  }

  addLabelGotoPage() {
    let pageButtons = this.elRef.nativeElement.querySelectorAll('.p-paginator-page');
    for (let elem of pageButtons) {
      if (elem) {
        this.renderer.setAttribute(elem, 'aria-label', 'Goto page ' + elem.innerHTML);
      }
    }
  }

}
