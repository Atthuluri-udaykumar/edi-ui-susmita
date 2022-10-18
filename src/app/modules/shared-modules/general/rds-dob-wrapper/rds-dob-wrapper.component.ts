import {AfterContentInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {FormControl} from '@angular/forms';
import systemErrors from '../../../../services/system-errors';

@Component({
  selector: 'app-rds-dob-wrapper',
  templateUrl: './rds-dob-wrapper.component.html',
  styleUrls: ['./rds-dob-wrapper.component.css']
})
export class RdsDobWrapperComponent implements OnInit, AfterContentInit {

  errorMessage: string = '';

  @Input() ctrlMonth: FormControl = new FormControl();
  @Input() ctrlDay: FormControl = new FormControl();
  @Input() ctrlYear: FormControl = new FormControl();
  @Input() refMonth: ElementRef = null;
  @Input() refDay: ElementRef = null;
  @Input() refYear: ElementRef = null;
  @Input() legend: string = '';

  hasErrors = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (this.ctrlMonth) {
      this.ctrlMonth.statusChanges.subscribe(
        value => {
          this.checkError();
        }
      );
    }
    if (this.ctrlDay) {
      this.ctrlDay.statusChanges.subscribe(
        value => {
          this.checkError();
        }
      );
    }
    if (this.ctrlYear) {
      this.ctrlYear.statusChanges.subscribe(
        value => {
          this.checkError();
        }
      );
    }
  }

  @HostListener('input-blur', ['$event'])
  onInputBlur(event) {
    let thisComp = this;
    setTimeout(function () {
      thisComp.checkError();
    }, 20);
  }

  @HostListener('keyup', ['$event'])
  onInputKeyUp(event) {
    let thisComp = this;
    setTimeout(function () {
      thisComp.checkError();
    }, 20);
  }

  checkError() {
    if (this.ctrlMonth.errors || this.ctrlDay.errors || this.ctrlYear.errors) {
      if (this.ctrlMonth.errors && this.ctrlMonth.touched) {
        this.renderer.addClass(this.refMonth, 'usa-input--error');
        this.hasErrors = true;
      }
      if (this.ctrlDay.errors && this.ctrlDay.touched) {
        this.renderer.addClass(this.refDay, 'usa-input--error');
        this.hasErrors = true;
      }
      if (this.ctrlYear.errors && this.ctrlYear.touched) {
        this.renderer.addClass(this.refYear, 'usa-input--error');
        this.hasErrors = true;
      }
      if (this.hasErrors) {
        this.errorMessage = systemErrors['error.invalidOrRequired'];
      }
    } else {
      this.hasErrors = false;
      this.renderer.removeClass(this.refMonth, 'usa-input--error');
      this.renderer.removeClass(this.refDay, 'usa-input--error');
      this.renderer.removeClass(this.refYear, 'usa-input--error');
    }
  }

}
