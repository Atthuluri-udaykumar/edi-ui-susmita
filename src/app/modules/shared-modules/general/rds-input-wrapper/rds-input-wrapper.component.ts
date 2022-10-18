import {AfterContentInit, Component, ContentChild, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormControlName} from '@angular/forms';
import systemErrors from '../../../../services/system-errors';
import {InputMask} from 'primeng-lts/inputmask';
import {InputNumber} from 'primeng-lts/inputnumber';

@Component({
  selector: 'app-rds-input-wrapper',
  templateUrl: './rds-input-wrapper.component.html',
  styleUrls: ['./rds-input-wrapper.component.css']
})
export class RdsInputWrapperComponent implements OnInit, AfterContentInit {
  hasErrors: boolean;
  errorMessage: string = '';

  @Input() label: string = '';
  @Input() componentId: string = '';
  @Input() customMessage: string = '';
  @Input() checkMask: boolean = false;

  @ContentChild(FormControlName)
  public controlName: FormControlName;
  @ContentChild('inputChild') input: ElementRef;

  control: FormControl;

  constructor(private _elRef: ElementRef, public renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (this.controlName) {
      this.control = this.controlName.control;
      this.control.statusChanges.subscribe(
        value => {
          this.checkError();
        }
      );
    }
  }

  @HostListener('input-blur', ['$event'])
  onInputBlur(event) {
    let thisComp = this;
    setTimeout(function () { // allows event to wait for the touch event
      thisComp.checkError();
    }, 50);
  }

  checkError() {
    let nativeElement;

    let controlErrors = this.control.errors;
    this.hasErrors = (this.control.invalid || !!controlErrors) && this.control.touched;

    // if (this.checkMask) {
    //   if (this.control.value && this.control.value.indexOf('_') >= 0) {
    //     controlErrors = {required: true};
    //     this.hasErrors = true;
    //   }
    // }

    if (this.input) {
      if (this.input instanceof InputMask) {
        nativeElement = this.input.inputViewChild.nativeElement;
      } else if (this.input instanceof InputNumber) {
        nativeElement = this.input.input.nativeElement;
      } else {
        nativeElement = this.input.nativeElement;
      }
    }

    if (this.hasErrors) {
      if (this.customMessage) {
        this.errorMessage = this.customMessage;
      } else {
        if (controlErrors) {
          Object.keys(controlErrors).forEach(keyError => {
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
      if (this.input) {
        let descriptionIds = nativeElement.getAttribute('aria-describedby');
        if (descriptionIds) {
          if (descriptionIds.indexOf('rds-input-error-desc') < 0) {
            descriptionIds += ' rds-input-error-desc';
          }
        } else {
          descriptionIds = 'rds-input-error-desc';
        }
        this.renderer.setAttribute(nativeElement, 'aria-describedby', descriptionIds);
        this.renderer.addClass(nativeElement, 'usa-input--error');
      }
    } else {
      if (this.input) {
        this.renderer.removeClass(nativeElement, 'usa-input--error');
        this.renderer.removeAttribute(nativeElement, 'aria-describedby');
      }
    }
  }
}
