import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Optional, Output, Renderer2, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import systemErrors from '../../../../services/system-errors';

@Component({
  selector: 'app-rds-input',
  templateUrl: './rds-input.component.html',
  styleUrls: ['./rds-input.component.css']
})
export class RdsInputComponent implements OnInit, ControlValueAccessor {

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Input() label: string = '';
  @Input() customMessage: string = '';

  @Input() name: string = '';
  @Input() maxLength: number = 255;
  @Input() size: number = 30;
  @Input() disabled: boolean = false;
  @Input() toggleView: boolean = false;
  @Input() autocomplete: 'on' | 'off' = 'on';
  @Input() describedBy: string = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @ViewChild('input') inputElement: ElementRef;

  @HostBinding('attr.id')
  externalId = '';

  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  get id() {
    return this._ID;
  }

  private _ID = '';

  hasErrors: boolean = false;
  errorMessage: string = '';
  control: AbstractControl;

  showHide: boolean = false;
  showHideButton: string = 'Show';

  value: any = '';

  constructor(@Optional() @Self() public controlDir: NgControl, public renderer: Renderer2) {
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    // Use below lines to apply a default validator programmatically
    this.control = this.controlDir.control;
    // let validators = control.validator ? [control.validator, Validators.required] : Validators.required;
    // control.updateValueAndValidity();
    this.control.statusChanges.subscribe(value => {
      if (this.control.touched) {
        this.checkError();
      } else {
        if (this.hasErrors && this.control.valid) {
          this.resetErrorStatus();
        }
      }
    });
  }

  reveal() {
    if (this.inputElement) {
      if (this.showHide) {
        this.showHideButton = 'Show';
        this.renderer.setAttribute(this.inputElement.nativeElement, 'type', 'password');
      } else {
        this.showHideButton = 'Hide';
        this.renderer.setAttribute(this.inputElement.nativeElement, 'type', 'text');
      }
      this.showHide = !this.showHide;
    }
  }

  checkError() {
    if (this.control && this.control.invalid) {
      this.hasErrors = true;
      this.setErrorMessage();
      this.setErrorAccessibility();
    } else {
      if (this.hasErrors) {
        this.resetErrorStatus();
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
        if (descriptionIds.indexOf('rds-input-error-desc') < 0) {
          descriptionIds += ' rds-input-error-desc';
        }
      } else {
        descriptionIds = 'rds-input-error-desc';
      }
      this.renderer.setAttribute(this.inputElement.nativeElement, 'aria-describedby', descriptionIds);
    }
  }

  removeErrorAccessibility() {
    if (this.inputElement) {
      this.renderer.removeAttribute(this.inputElement.nativeElement, 'aria-describedby');
    }
  }

  // change events from the component
  public onChange(event) {
    // get value from text area
    const newValue = event.target.value;
    // update the form
    this.propagateChange(newValue);
  }

  public onTouched(event) {
    this.propagateTouched();
    this.checkError();
    this.blur.emit(event); // bubble up blur event
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
    if (obj === null || obj === undefined) {
      this.resetErrorStatus();
    }

    this.value = obj;
  }

  resetErrorStatus() {
    this.hasErrors = false;
    this.errorMessage = '';
    this.removeErrorAccessibility();
  }

}
