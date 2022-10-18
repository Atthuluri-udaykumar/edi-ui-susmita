import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Person} from '../../../../model/person.model';
import {FormService} from '../../../../services/form.service';
import {ApiService} from '../../../../services/api.service';
import {EdiValidators} from '../../../../services/edi-validators';
import systemErrors from '../../../../services/system-errors';
import {SmsMessage} from '../../../../model/sms-message.model';
import {SessionService} from '../../../../services/session.service';
import {ErrorMessagesService} from '../../general/error-messages/error-messages.service';
import {ResponseService} from '../../../../services/response.service';

@Component({
  selector: 'app-text-number',
  templateUrl: './text-number.component.html',
  styleUrls: ['./text-number.component.css']
})
export class TextNumberComponent implements OnInit {
  @Output() continuePressed = new EventEmitter<any>();
  @Output() dialogClosed = new EventEmitter<any>();

  displayConfirmation = false;
  errorMsgs = [];
  codeSent = false;

  verificationNumber: String = '';

  textEnabledNumber: FormControl;
  verificationCode: FormControl;
  textEnabledForm: FormGroup;

  current_user: Person;

  @Input() displayNumber = false;

  @ViewChild('verificationField', { static: true }) verificationField: ElementRef;

  constructor(private formService: FormService, private apiService: ApiService, private session: SessionService,
              private errorService: ErrorMessagesService, private responseService: ResponseService) {
  }

  ngOnInit() {
    this.current_user = this.session.getCurrentUser();

    this.textEnabledNumber = new FormControl('', [Validators.required, EdiValidators.minLength(10, 'error')]);
    this.verificationCode = new FormControl('', [Validators.required, EdiValidators.minLength(6, 'error')]);
    this.textEnabledForm = new FormGroup({
      textEnabledNumber: this.textEnabledNumber,
      verificationCode: this.verificationCode
    }, {updateOn: 'blur'});
  }

  submit() {

    let errors = [];

    this.formService.touchControls(this.textEnabledForm);

    errors.push(...this.formService.validateControlsAndGetList(this.textEnabledForm, 'sms'));

    if (this.verificationCode.invalid) {
      if (this.verificationCode.disabled) {
        this.textEnabledForm.controls.pinCode.setErrors({required: true});
        // Set manually the error and change state to pending to trigger error on disabled field
        this.textEnabledForm.controls.pinCode.markAsPending({emitEvent: true});
      }
    }

    this.errorMsgs = errors;

    if (this.errorMsgs.length === 0) {

      if (this.verificationNumber === this.verificationCode.value) {
        this.current_user.textEnabledNumber = this.textEnabledNumber.value;
        let person = new Person();
        person.personId = this.current_user.personId;
        person.userName = this.current_user.userName;
        person.textEnabledNumber = this.textEnabledNumber.value;

        this.apiService.setTextEnabledNumber(person).subscribe(data => {
            this.errorMsgs = this.responseService.validateResponse(data);
            if (this.errorMsgs.length === 0) {
              this.displayConfirmation = true;
              this.closeDialog();
            }
          }
        );

      } else {
        this.errorMsgs.push({detail: systemErrors['error.sms.verificationCode.noMatch']});
      }
    }

  }

  send() {
    let errors = [];

    this.textEnabledForm.get('textEnabledNumber').markAsTouched();
    if (!this.textEnabledNumber.value || this.textEnabledNumber.errors) {
      if (this.textEnabledNumber.errors && this.textEnabledNumber.errors.minLength) {
        errors.push({detail: this.formService.getInvalidErrorMessageStd('textEnabledNumber')});
      } else {
        errors.push({detail: this.formService.getEmptyErrorMessageStd('textEnabledNumber')});
      }
    } else {

      let message = new SmsMessage();
      message.phoneNumber = this.textEnabledNumber.value;
      message.body = this.current_user.personId + '';
      this.apiService.sendVerificationCode(message).subscribe(
        data => {
          this.errorMsgs = this.responseService.validateResponse(data);
          if (this.errorMsgs.length === 0) {
            this.verificationNumber = this.session.decode(data.result, this.current_user.personId);
            this.codeSent = true;
            let this_comp = this;
            setTimeout(function () {
              this_comp.verificationField.nativeElement.focus();
            }, 0);
          }
        }
      );
    }
    this.errorMsgs = errors;
  }

  closeDialog() {
    this.errorMsgs = [];
    this.codeSent = false;
    this.textEnabledForm.controls.textEnabledNumber.setValue('');
    this.textEnabledForm.controls.verificationCode.setValue('');
    this.textEnabledForm.reset();
    this.verificationNumber = '';
    this.dialogClosed.emit(true);
  }

  continueToNextPage() {
    this.continuePressed.emit(true);
  }

  resetForm() {
    this.textEnabledForm.reset();
  }
}
