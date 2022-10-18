import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BEGINLETTER, HASLOWCASE, HASNUMMBER, HASSPCHAR, HASUPCASE, ALPHANUMERIC, EdiValidators} from '../../../../../services/edi-validators';
import systemErrors from '../../../../../services/system-errors';
import {LoginPasswordService} from '../login-password.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.css']
})
export class LoginPasswordComponent implements OnInit {

  environmentUrl = environment.url;

  @Input() nextElementFocus: any;
  @Input() previousElementFocus: any;

  @ViewChild('loginPassGuidelines', { static: true }) passGuide: ElementRef;
  @ViewChild('loginIdEl', { static: true }) loginEl: ElementRef;
  @ViewChild('passReEl', { static: true }) passReEl: ElementRef;

  @Output() loginPassData: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @ViewChild('loginChar', { static: true }) loginChar: ElementRef;
  @ViewChild('loginCase', { static: true }) loginCase: ElementRef;
  @ViewChild('passChar', { static: true }) passChar: ElementRef;
  @ViewChild('passBegin', { static: true }) passBegin: ElementRef;
  @ViewChild('pass1LowCase', { static: true }) pass1LowCase: ElementRef;
  @ViewChild('pass1UpCase', { static: true }) pass1UpCase: ElementRef;
  @ViewChild('pass1Number', { static: true }) pass1Number: ElementRef;
  @ViewChild('pass1SpChar', { static: true }) pass1SpChar: ElementRef;
  @ViewChild('passNoLogin', { static: true }) passNoLogin: ElementRef;
  @ViewChild('passNoReserved', { static: true }) passNoReserved: ElementRef;
  @ViewChild('passNoDictionary', { static: true }) passNoDictionary: ElementRef;

  loginId: FormControl;
  password: FormControl;
  rePassword: FormControl;

  loginPassForm: FormGroup;

  constructor(public renderer: Renderer2, private loginPassService: LoginPasswordService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.loginId = new FormControl('', [Validators.required,
      EdiValidators.minLength(8, systemErrors['error.generic.loginId.invalid']),
      EdiValidators.maxLength(15, systemErrors['error.generic.loginId.invalid']),
      EdiValidators.loginId()]);
    this.password = new FormControl('', [Validators.required,
      EdiValidators.contains('loginId', systemErrors['error.generic.password.containsLoginId']),
      EdiValidators.minLength(8, systemErrors['error.generic.password.invalid']),
      EdiValidators.maxLength(14, systemErrors['error.generic.password.invalid']),
      EdiValidators.password(systemErrors['error.generic.password.invalid']),
      EdiValidators.reserved()]);
    this.rePassword = new FormControl('', [Validators.required,
      EdiValidators.equalTo('password', systemErrors['error.generic.password.notEqual'])]);

    this.loginPassForm = new FormGroup({
      'loginId': this.loginId,
      'password': this.password,
      'rePassword': this.rePassword
    });

    this.loginPassForm.get('loginId').valueChanges.subscribe(
      value => {
        if (value) {
          this.evaluate(this.loginChar, (value.length >= 8 && value.length <= 15));
          this.evaluate(this.loginCase, ALPHANUMERIC.test(value));

          if (this.loginPassForm.get('password').value) {
            this.evaluate(this.passNoLogin,
              (this.loginPassForm.get('password').value.toString().toUpperCase().indexOf(value.toString().toUpperCase()) < 0));
          }

          if (this.loginPassForm.get('password').value === '' || value === '') {
            this.evaluate(this.passNoLogin, true);
          }
        }
      }
    );

    this.loginPassForm.get('password').valueChanges.subscribe(
      value => {
        if (value) {
          this.evaluate(this.passChar, (value.length >= 8 && value.length <= 14));
          this.evaluate(this.passBegin, BEGINLETTER.test(value));
          this.evaluateSub(this.pass1Number, HASNUMMBER.test(value));
          this.evaluateSub(this.pass1LowCase, HASLOWCASE.test(value));
          this.evaluateSub(this.pass1UpCase, HASUPCASE.test(value));
          this.evaluateSub(this.pass1SpChar, HASSPCHAR.test(value));
          if (HASSPCHAR.test(value)) {

            this.evaluate(this.passNoDictionary, true);
          }
          if (this.loginPassForm.get('loginId').value) {
            this.evaluate(this.passNoLogin,
              (value.toString().toUpperCase().indexOf(this.loginPassForm.get('loginId').value.toString().toUpperCase()) < 0));
          }
          if (this.loginPassForm.get('loginId').value === '' || value === '') {
            this.evaluate(this.passNoLogin, true);
          }

          this.evaluate(this.passNoReserved, !this.loginPassForm.get('password').getError('reserved'));
        }
      }
    );

    this.loginPassService.submitEvent.subscribe(
      value => {
        Object.keys(this.loginPassForm.controls).forEach(
          key => {
            this.loginPassForm.get(key).markAsTouched();
            this.loginPassForm.get(key).updateValueAndValidity({emitEvent: true});
          }
        );
      }
    );

    this.activeRoute.url.subscribe(url => this.loginPassForm.reset()); // Reset component when navigate to different registration page

  }

  evaluate(element: ElementRef, expression) {
    if (expression) {
      this.renderer.removeClass(element.nativeElement, 'pi-times');
      this.renderer.removeClass(element.nativeElement, 'pi-minus');
      this.renderer.addClass(element.nativeElement, 'pi-check');
      this.renderer.setStyle(element.nativeElement, 'color', '#046b99');
    } else {
      this.renderer.removeClass(element.nativeElement, 'pi-minus');
      this.renderer.removeClass(element.nativeElement, 'pi-check');
      this.renderer.addClass(element.nativeElement, 'pi-times');
      this.renderer.setStyle(element.nativeElement, 'color', 'red');
    }
  }

  evaluateSub(element: ElementRef, expression) {
    if (expression) {
      this.renderer.removeClass(element.nativeElement, 'pi-times-circle');
      this.renderer.removeClass(element.nativeElement, 'pi-minus-circle');
      this.renderer.addClass(element.nativeElement, 'pi-check-circle');
      this.renderer.setStyle(element.nativeElement, 'color', '#046b99');
    } else {
      this.renderer.removeClass(element.nativeElement, 'pi-minus-circle');
      this.renderer.removeClass(element.nativeElement, 'pi-check-circle');
      this.renderer.addClass(element.nativeElement, 'pi-times-circle');
      this.renderer.setStyle(element.nativeElement, 'color', 'red');
    }
  }

  onTab(event) {
    event.preventDefault();
    let comp = this;

    if (event.target.id === 'reservedWords') {
      setTimeout(function () {
        comp.loginEl['inputElement'].nativeElement.focus();
      }, 0);
    }
    if (event.target.id === 'passwordReentered') {
      if (this.nextElementFocus) {
        setTimeout(function () {
          comp.nextElementFocus.focus();
        }, 0);
      }
    }
  }

  onShiftTab(event) {
    event.preventDefault();
    let comp = this;

    if (event.target.id === 'logPassGuides') {
      if (this.previousElementFocus) {
        setTimeout(function () {
          // this will only work if previous element is input mask
          comp.previousElementFocus.el.nativeElement.children[0].focus();
        }, 0);
      }
    }

    if (event.target.id === 'reservedWords') {
      setTimeout(function () {
        comp.passReEl['inputElement'].nativeElement.focus();
      }, 0);
    }
  }

  onBlur(event) {
    this.loginPassData.emit(this.loginPassForm);
  }

  onFocus(event) {
    let comp = this;
    if (event.target.id === 'focusSwitch') {
      setTimeout(function () {
        comp.passGuide.nativeElement.focus();
      }, 0);
    }
  }

}
