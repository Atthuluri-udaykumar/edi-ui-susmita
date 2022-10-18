import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appRangeFilter]'
})
export class RangeFilterDirective {
  // ONLY allow 1 - 12 integer values
  private REGEX_1_THRU_12_ONLY: RegExp = new RegExp(/^(1[0-2]|[0-9]|0[1-9])$/);


  // ONLY allow 1 - 31 integer values
  private REGEX_1_THRU_31_ONLY: RegExp = new RegExp(/^(3[01]|[12][0-9]|[1-9]||0[1-9])$/);

  // ONLY allow integers beginning with 1 or 2 up to 4 digits ("\d" = any digit)
  // private REGEX_STARTS_WITH_1_OR_2_UP_TO_4_DIGITS: RegExp = new RegExp(/^[1|2]\d{0,3}$/);

  private REGEX_STARTS_WITH_1_OR_2_UP_TO_4_DIGITS: RegExp = new RegExp(/^\d{0,4}$/);

  @Input() appRangeFilter: string;

  constructor(private el: ElementRef) {
  }


  @HostListener('keypress', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);

    switch (this.appRangeFilter) {
      case 'month': {
        if (!String(next).match(this.REGEX_1_THRU_12_ONLY)) {
          // DOESN'T MATCH "REGEX_1_THRU_12_ONLY"
          // Prevent key stroke
          event.preventDefault();
        }
        break;
      }
      case 'day': {
        if (!String(next).match(this.REGEX_1_THRU_31_ONLY)) {
          // DOESN'T MATCH "REGEX_1_THRU_31_ONLY"
          // Prevent key stroke
          event.preventDefault();
        }
        break;
      }
      case 'year': {
        if (!String(next).match(this.REGEX_STARTS_WITH_1_OR_2_UP_TO_4_DIGITS)) {
          // DOESN'T MATCH "REGEX_1_THRU_31_ONLY"
          // Prevent key stroke
          event.preventDefault();
        }
        break;
      }
    }

  }
}
