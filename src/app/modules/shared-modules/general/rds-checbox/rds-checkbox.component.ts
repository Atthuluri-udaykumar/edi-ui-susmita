import {Component, ElementRef, HostBinding, Input, OnInit, Optional, Renderer2, Self, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NgControl, ValidationErrors} from '@angular/forms';
import systemErrors from '../../../../services/system-errors';

@Component({
  selector: 'app-rds-checkbox',
  templateUrl: './rds-checkbox.component.html',
  styleUrls: ['./rds-checkbox.component.css']
})
export class RdsCheckboxComponent implements OnInit, ControlValueAccessor {
  @Input() validate: boolean = true;
  @Input() label: string = '';
  @Input() customMessage: string = '';

  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @ViewChild('input', {static: true}) inputElement: ElementRef;

  @HostBinding('attr.id')
  externalId = '';

  @Input()
  set id(id: string) {
    this._ID = id;
    this.externalId = null;
  }

  get id() {
    return this._ID;
  }

  private _ID = '';

  private _value = {checked: false, value: ''};

  get value() {
    return this._value;
  }

  @Input()
  set value(val) {
    this._value = val;
  }

  hasErrors: boolean = false;
  errorMessage: string = '';
  control: AbstractControl;

  constructor(@Optional() @Self() public controlDir: NgControl, public renderer: Renderer2) {
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    // Use below lines to apply a default validator programmatically
    this.control = this.controlDir.control;
    if (this?.validate && this?.control) {
      this.control.setValidators([this?.validateCtrl.bind(this)]);
      this.control.statusChanges.subscribe(() => {
        this.checkError();
      });
    }
  }

  validateCtrl(ctrl: AbstractControl) {
    let errors: ValidationErrors = {};

    if (!ctrl.value) {
      errors.checkBox = true;
    }

    return errors; // returns errors
  }

  checkError() {
    if (this.control && this.control.invalid) {
      this.hasErrors = true;
      this.setErrorMessage();
      this.setErrorAccessibility();
    } else {
      if (this.hasErrors) {
        this.hasErrors = false;
        this.errorMessage = '';
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
    if (this.inputElement) {
      let descriptionIds = this.inputElement.nativeElement.getAttribute('aria-describedby');
      if (descriptionIds) {
        if (descriptionIds.indexOf('rds-input-check-error-desc') < 0) {
          descriptionIds += ' rds-input-check-error-desc';
        }
      } else {
        descriptionIds = 'rds-input-check-error-desc';
      }
      this.renderer.setAttribute(this.inputElement.nativeElement, 'aria-describedby', descriptionIds);
    }
  }

  removeErrorAccessibility() {
    this.renderer.removeAttribute(this.inputElement.nativeElement, 'aria-describedby');
  }

  // change events from the component
  public onChange(event) {
    this._value.checked = event.target.checked;
    // update the form
    this.propagateChange(this._value);
  }

  public onTouched(event) {
    this.propagateTouched();
    if (this.validate) {
      this.checkError();
    }
  }

  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => {};
  // the method set in registerOnTouched to emit changes back to the form
  private propagateTouched: any = () => {};

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
  writeValue(obj: { checked: boolean, value: '' }): void {
    if (this.inputElement) {
      if (obj) {
        this.inputElement.nativeElement.value = obj;
        this.inputElement.nativeElement.checked = obj.checked;
        this._value = obj;
      } else {
        this.inputElement.nativeElement.value = {checked: false, value: ''};
        this.inputElement.nativeElement.checked = false;
        this._value = {checked: false, value: ''};
      }
    }
  }

}
