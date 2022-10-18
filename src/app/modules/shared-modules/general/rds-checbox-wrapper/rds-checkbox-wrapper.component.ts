import {AfterContentInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {FormControl} from '@angular/forms';
import systemErrors from '../../../../services/system-errors';

@Component({
  selector: 'app-rds-checkbox-wrapper',
  templateUrl: './rds-checkbox-wrapper.component.html',
  styleUrls: ['./rds-checkbox-wrapper.component.css']
})
export class RdsCheckboxWrapperComponent implements OnInit, AfterContentInit {

  isError: boolean;
  errorMessage: string = '';

  @Input() fControl: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() componentId: string = '';
  @Input() customMessage: string = '';

  inputElement: any;

  constructor(private _elRef: ElementRef, public renderer: Renderer2) {
  }

  ngOnInit() {
    if (this.fControl) {
      this.fControl.valueChanges.subscribe(
        value => {
          this.checkError();
        }
      );
    }
  }

  ngAfterContentInit() {
    this.getInputElmentRef();
  }

  getInputElmentRef() {
    if (this.componentId) {
      this.inputElement = this._elRef.nativeElement.querySelector('#' + this.componentId);
    }
  }

  @HostListener('input-blur', ['$event'])
  onInputBlur(event) {
    this.checkError();
  }

  checkError() {
    let controlErrors = this.fControl.errors;
    this.isError = !this.fControl.value;

    if (this.isError) {
      if (this.customMessage) {
        this.errorMessage = this.customMessage;
      } else {
        Object.keys(controlErrors).forEach(keyError => {
          if (keyError === 'required') {
            this.errorMessage = systemErrors['error.invalidOrRequired'];
          } else if (keyError === 'backend') {
            this.errorMessage = '';
          } else {
            this.errorMessage = controlErrors[keyError] === 'true' ? '' : controlErrors[keyError];
          }
        });
      }
      if (!this.inputElement) {
        this.getInputElmentRef();
      }
      if (this.inputElement) {
        let descriptionIds = this.inputElement.getAttribute('aria-describedby');
        if (descriptionIds) {
          if (descriptionIds.indexOf('rds-input-error-desc') < 0) {
            descriptionIds += ' rds-input-error-desc';
          }
        } else {
          descriptionIds = 'rds-input-error-desc';
        }
        this.renderer.setAttribute(this.inputElement, 'aria-describedby', descriptionIds);
      }
    }
  }

  evaluateInputError(): boolean { // TODO put in ngOnChanges to avoid multiple calls
    return this.fControl.touched && !this.fControl.value;
  }

}
