
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Person } from 'src/app/model/person.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { EdiValidators, BEGINLETTER, HASNUMMBER, HASLOWCASE, HASUPCASE, HASSPCHAR } from 'src/app/services/edi-validators';
import { ResponseService } from 'src/app/services/response.service';
import { SessionService } from 'src/app/services/session.service';
import systemErrors from 'src/app/services/system-errors';
import confirmation from 'src/app/services/system-successes';
import { environment } from 'src/environments/environment';


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
  @ViewChild('currPasswordEl', { static: true }) loginEl: ElementRef;
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

  currPassword: FormControl;
  password: FormControl;
  rePassword: FormControl;

  changePassForm: FormGroup;

  errorMsgs = [];

  title: string = '';

  user: Person;

  showConfirmation = false;
  successMsgs = [];

  changePassFlag = false;
  isLoading = false;

  constructor(public renderer: Renderer2, private activeRoute: ActivatedRoute, private router: Router,
    private authService: AuthService, private formService: FormService, private apiService: ApiService,
    private session: SessionService, private responseService: ResponseService) {
    router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.authService.validatedForResetPassword = false;
      });
  }

  ngOnInit() {
    this.title = 'Change Password';
    if (this.activeRoute.snapshot.routeConfig.path === 'changeExpiredPassword') {
      this.title = 'Change Expired Password';
    }

    this.user = this.session.getCurrentUser();

    this.currPassword = new FormControl('', [Validators.required,
    EdiValidators.minLength(8, systemErrors['error.generic.password.minlength']),
    EdiValidators.maxLength(14, systemErrors['error.generic.password.maxlength']),
    EdiValidators.reserved()]);
    this.password = new FormControl('', [Validators.required,
    EdiValidators.minLength(8, systemErrors['error.generic.password.minlength']),
    EdiValidators.maxLength(14, systemErrors['error.generic.password.maxlength']),
    EdiValidators.password(systemErrors['error.generic.password.invalid']),
    EdiValidators.reserved()]);
    this.rePassword = new FormControl('', [Validators.required,
    EdiValidators.equalTo('password', systemErrors['error.generic.password.notEqual'])]);

    this.changePassForm = new FormGroup({
      'currPassword': this.currPassword,
      'password': this.password,
      'rePassword': this.rePassword
    });


    this.changePassForm.get('password').valueChanges.subscribe(
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
          this.evaluate(this.passNoLogin,
            (value.toString().toUpperCase().indexOf(this.user.userName.toUpperCase()) < 0));

          this.evaluate(this.passNoReserved, !this.changePassForm.get('password').getError('reserved'));
        }
      }
    );

    this.activeRoute.url.subscribe(url => this.changePassForm.reset()); // Reset component when navigate to different registration page

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
    this.loginPassData.emit(this.changePassForm);
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
  }

  back() {
    
  }
}
