import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BEGINLETTER, HASLOWCASE, HASNUMMBER, HASSPCHAR, HASUPCASE, EdiValidators} from '../../../../../services/edi-validators';
import systemErrors from '../../../../../services/system-errors';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {FormService} from '../../../../../services/form.service';
import {ApiService} from '../../../../../services/api.service';
import {SessionService} from '../../../../../services/session.service';
import {Person} from '../../../../../model/person.model';
import {ResponseService} from '../../../../../services/response.service';
import {filter} from 'rxjs/operators';
import {environment} from '../../../../../../environments/environment';
import {AuthService} from '../../../../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  environmentUrl = environment.url;

  @ViewChild('continueButton', { static: true }) nextElementFocus: ElementRef;
  @Input() previousElementFocus: any;

  @ViewChild('loginPassGuidelines', { static: true }) passGuide: ElementRef;
  @ViewChild('loginIdEl', { static: true }) loginEl: ElementRef;
  @ViewChild('passReEl', { static: true }) passReEl: ElementRef;

  @Output() loginPassData: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

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

  errorMsgs = [];

  title: string = '';

  user: Person;

  showConfirmation = false;

  constructor(public renderer: Renderer2, private activeRoute: ActivatedRoute, private router: Router,
              private authService: AuthService,  private formService: FormService, private apiService: ApiService,
              private session: SessionService, private responseService: ResponseService) {
    router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.authService.validatedForResetPassword = false;
      });
  }

  ngOnInit() {
    this.title = 'Reset Password';
    if (this.activeRoute.snapshot.routeConfig.path === 'changeExpiredPassword') {
      this.title = 'Change Expired Password';
    }

    this.user = this.session.getCurrentUser();

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
          if (this.loginPassForm.get('password').value) {
            if (value) {
              this.evaluate(this.passNoLogin,
                (this.loginPassForm.get('password').value.toString().toUpperCase().indexOf(value.toString().toUpperCase()) < 0));
            }
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
            if (value) {
              this.evaluate(this.passNoLogin,
                (value.toString().toUpperCase().indexOf(this.loginPassForm.get('loginId').value.toString().toUpperCase()) < 0));
            }
          }
          if (this.loginPassForm.get('loginId').value === '' || value === '') {
            this.evaluate(this.passNoLogin, true);
          }

          this.evaluate(this.passNoReserved, !this.loginPassForm.get('password').getError('reserved'));
        }
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
        comp.loginEl.nativeElement.focus();
      }, 0);
    }
    if (event.target.id === 'passwordReentered') {
      if (this.nextElementFocus) {
        setTimeout(function () {
          comp.nextElementFocus.nativeElement.focus();
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
          // TODO this will only work if previous element is input mask
          comp.previousElementFocus.el.nativeElement.children[0].focus();
        }, 0);
      }
    }

    if (event.target.id === 'reservedWords') {
      setTimeout(function () {
        comp.passReEl.nativeElement.focus();
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

  submit() {
    this.errorMsgs = [];
    this.formService.touchControls(this.loginPassForm);
    let errorMap = this.formService.validateControlsAndGetMap(this.loginPassForm, '');

    if (this.loginPassForm.get('rePassword').errors) {
      if (this.loginPassForm.get('rePassword').errors.equalTo) {
        errorMap.get('rePassword').splice(0, 1);
        errorMap.get('rePassword').push({detail: systemErrors['error.generic.password.notEqual']});
      }
    }

    this.errorMsgs.push(...this.formService.getErrorMapAsList(errorMap));

    if (this.errorMsgs.length === 0) {
      this.user.userName = this.loginPassForm.get('loginId').value;
      this.user.password = this.loginPassForm.get('password').value;
      this.apiService.resetPassword(this.user).subscribe(data => {
        let errorsTemp = this.responseService.validateResponse(data);
        if (errorsTemp.length === 0) {
          this.showConfirmation = true;
        } else {
          this.errorMsgs = errorsTemp;
        }
      });
    }
  }

  closeDialog() {
    this.authService.validated = false;
    this.router.navigate(['login']);
  }

  back() {
    this.authService.validated = false;
    this.authService.validatedForResetPassword = false;
    this.router.navigate(['login']);
  }

}
