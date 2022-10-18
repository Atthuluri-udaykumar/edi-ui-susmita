import { Component, ElementRef, Input, OnInit, Optional, Renderer2, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';
import systemErrors from '../../../../services/system-errors';
import { DateUtilService } from '../../../../services/date-util.service';

class DateValue {
  month: string = '';
  day: string = '';
  year: string = '';
}

@Component({
  selector: 'app-rds-date',
  templateUrl: './rds-date.component.html',
  styleUrls: ['./rds-date.component.css']
})
export class RdsDateComponent implements OnInit, ControlValueAccessor {

  errorMessage: string = '';

  @ViewChild('crefMonth') inputMonth: ElementRef;
  @ViewChild('crefDay') inputDay: ElementRef;
  @ViewChild('crefYear') inputYear: ElementRef;
  @Input() describedBy: string = '';

  @Input() disabled: boolean = false;
  @Input() legend: string = '';

  @Input() futureDatesAllowed: boolean = false;
  @Input() validate: boolean = true;

  hasErrors = false;
  monthError = false;
  dayError = false;
  yearError = false;
  control: AbstractControl;

  value: DateValue;

  constructor(@Optional() @Self() public controlDir: NgControl, public renderer: Renderer2) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {
    this.control = this.controlDir.control;
    if (!this.value) {
      this.value = new DateValue();
    }
    if (this.validate) { // validation enabled by default
      this.control.setValidators([this.validator.bind(this)]);
    }

    this.control.statusChanges.subscribe(() => {
      if (this.control.touched) {
        this.checkError(null);
      }
    });
  }

  validator(ctrl: AbstractControl) {

    let errors: ValidationErrors = {};
    if (ctrl.value) {
      let monthValue = parseInt(ctrl.value.month, 10);
      let dayValue = parseInt(ctrl.value.day, 10);
      let yearValue = parseInt(ctrl.value.year, 10);

      if (!ctrl.value || !ctrl.value.month || monthValue < 1 || monthValue > 12) {
        errors.monthError = true;
      }
      if (!ctrl.value || !ctrl.value.day || dayValue < 1 || dayValue > 31) {
        errors.dayError = true;
      }
      let dobYearMax: number = (new Date().getFullYear());
      if (!ctrl.value || !ctrl.value.year || yearValue < 1 || (yearValue > dobYearMax && !this.futureDatesAllowed)) {
        errors.yearError = true;
      }

      if (Object.keys(errors).length === 0) {
        // Check if it is a valid Date
        let validDate: boolean = DateUtilService.checkDate(yearValue, monthValue, dayValue);

        let lessThanTomorrow: boolean = DateUtilService.checkLessThanTomorrow(yearValue, monthValue, dayValue);

        if (!validDate) {
          errors.dobInvalid = true;
        }

        if (!this.futureDatesAllowed && !lessThanTomorrow) {
          errors.future = true;
        }
      }
    } else {
      errors.required = true;
    }

    return errors; // returns errors
  }

  checkError(relatedTarget) {
    if (relatedTarget) {
      if (['iMonth', 'iDay', 'iYear'].includes(relatedTarget.id)) {
        this.resetErrorState();
        return;
      }
    }
    if (this.control && this.control.invalid) {
      this.hasErrors = true;
      if (this.control.errors) {
        this.monthError = !!this.control.errors.monthError;
        this.dayError = !!this.control.errors.dayError;
        this.yearError = !!this.control.errors.yearError;
        if (this.control.errors.required || this.control.errors.dobInvalid || this.control.errors.future) {
          this.monthError = true;
          this.dayError = true;
          this.yearError = true;
        }
        this.errorMessage = systemErrors['error.invalidOrRequired'];
      }
    } else {
      if (this.hasErrors) {
        this.resetErrorState();
      }
    }
  }

  resetErrorState() {
    this.hasErrors = false;
    this.monthError = false;
    this.dayError = false;
    this.yearError = false;
    this.errorMessage = '';
  }

  public onChange(event) {
    const targetId = event.target.id;
    // get value from text area
    if (targetId === 'iMonth') {
      this.value.month = event.target.value;
    }
    if (targetId === 'iDay') {
      this.value.day = event.target.value;
    }
    if (targetId === 'iYear') {
      this.value.year = event.target.value;
    }
    const newValue = this.value;
    // update the form
    this.propagateChange(newValue);
  }

  public onTouched(event) {
    this.propagateTouched();
    this.checkError(event.relatedTarget);
  }

  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => { };
  // the method set in registerOnTouched to emit changes back to the form
  private propagateTouched: any = () => { };

  writeValue(obj: any): void {
    if (obj === null || obj === undefined) { // When obj comes null means control reset
      obj = new DateValue();
      this.resetErrorState();
    }
    if (this.inputMonth) {
      this.inputMonth.nativeElement.value = obj.month;
    }
    if (this.inputDay) {
      this.inputDay.nativeElement.value = obj.day;
    }
    if (this.inputYear) {
      this.inputYear.nativeElement.value = obj.year;
    }
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
