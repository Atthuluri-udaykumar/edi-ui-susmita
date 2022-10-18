import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Optional, Output, Renderer2, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import systemErrors from '../../../../services/system-errors';

@Component({
  selector: 'app-rds-select',
  templateUrl: './rds-select.component.html',
  styleUrls: ['./rds-select.component.css']
})
export class RdsSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Output() selectChange: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Input() label: string = '';
  @Input() customMessage: string = '';

  @Input() items: any = [];
  @Input() name: string = '';
  @Input() size: number = 1;  // warning: Current Css only supports size 1
  @Input() disabled: boolean = false;
  @Input() describedBy: string = '';
  @Input() emptyItem: string = '';
  @ViewChild('select') selectElement: ElementRef;

  @HostBinding('attr.id')
  externalId = '';

  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  // The internal data model
  private innerValue: any = '';

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  @Input()
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      let event = { target: { value: v } };
      this.onChange(event);
    }
  }

  get id() {
    return this._ID;
  }

  private _ID = '';

  hasErrors: boolean = false;
  errorMessage: string = '';
  control: AbstractControl;

  constructor(@Optional() @Self() public controlDir: NgControl, public renderer: Renderer2) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  ngAfterViewInit(): void {
    if (this.selectElement && this.innerValue) {
      this.selectElement.nativeElement.value = this.innerValue;
    }
  }

  ngOnInit(): void {
    if (this.controlDir) {
      // Use below lines to apply a default validator programmatically
      this.control = this.controlDir.control;
      // let validators = control.validator ? [control.validator, Validators.required] : Validators.required;
      // control.updateValueAndValidity();
      this.control.statusChanges.subscribe(value => {
        if (this.control.touched) {
          this.checkError();
        } else {
          if (this.hasErrors && this.control.valid) {
            this.hasErrors = false;
            this.removeErrorAccessibility();
          }
        }
      });
    }
  }

  checkError() {
    if (this.control && !this.control.valid) {
      this.hasErrors = true;
      this.setErrorMessage();
      this.setErrorAccessibility();
    } else {
      if (this.hasErrors) {
        this.hasErrors = false;
        this.removeErrorAccessibility();
      }
    }
  }

  setErrorMessage() {
    if (this.customMessage) {
      this.errorMessage = this.customMessage;
    } else {
      if (this.control.errors) {
        Object.keys(this.control.errors).forEach(keyError => {
          if (keyError === 'required') {
            this.errorMessage = systemErrors['error.invalidOrRequired'];
          } else if (keyError === 'backend') {
            // error from backend shown in header
            this.errorMessage = '';
          } else {
            this.errorMessage = systemErrors['error.invalidOrRequired'];
            // If the value in the key value pair is text just show generic error. Detail error should show in the top of the screen
          }
        });
      }
    }
  }

  setErrorAccessibility() {
    if (this.selectElement) {
      let descriptionIds = this.selectElement.nativeElement.getAttribute('aria-describedby');
      if (descriptionIds) {
        if (descriptionIds.indexOf('rds-input-error-desc') < 0) {
          descriptionIds += ' rds-input-error-desc';
        }
      } else {
        descriptionIds = 'rds-input-error-desc';
      }
      this.renderer.setAttribute(this.selectElement.nativeElement, 'aria-describedby', descriptionIds);
    }
  }

  removeErrorAccessibility() {
    this.renderer.removeAttribute(this.selectElement.nativeElement, 'aria-describedby');
  }

  // change events from the component
  public onChange(event) {
    // get value from text area
    const newValue = event.target.value;
    // emit event
    this.selectChange.emit(event.target.value);
    // update the form
    this.propagateChange(newValue);
  }

  public onTouched(event) {
    this.propagateTouched();
    this.checkError();
    this.blur.emit(event);
  }

  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => { };
  // the method set in registerOnTouched to emit changes back to the form
  private propagateTouched: any = () => { };

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  registerOnChange(fn: any): void {
    // Store the provided function as an internal method.
    this.propagateChange = fn;
  }

  /**
   * Update form when DOM element is blurred (view => model)
   */
  registerOnTouched(fn: any): void {
    // Store the provided function as an internal method.
    this.propagateTouched = fn;
  }

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Write form value to the DOM element (model => view)
   */
  writeValue(obj: any): void {
    if (this.selectElement) {
      this.selectElement.nativeElement.value = obj;
    } else if (obj) {
      this.innerValue = obj;
    }
  }

}
