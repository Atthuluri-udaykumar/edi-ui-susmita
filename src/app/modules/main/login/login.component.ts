import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { SessionService } from '../../../services/session.service';
import { AuthService } from '../../../services/auth.service';
import { TimeoutService } from '../../../services/timeout.service';
import { Constants } from '../../../services/constants';
import { Error } from '../../../model/error.model';
import { Title } from '@angular/platform-browser';
import { ErrorMessagesService } from '../../shared-modules/general/error-messages/error-messages.service';
import { FormService } from '../../../services/form.service';
import { ResponseService } from '../../../services/response.service';
import { DOCUMENT, Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { EdiValidators } from '../../../services/edi-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginId: FormControl;
  password: FormControl;
  mfaToken: FormControl;

  errorMsgs: Error[];

  userAccessFlow: string = '';
  showEmailSuccess: boolean;

  constructor(private router: Router, private apiService: ApiService, private responseService: ResponseService,
    private authService: AuthService, private sessionService: SessionService, private timeoutService: TimeoutService,
    private _location: Location, private constants: Constants, private formService: FormService, private element: ElementRef,
    private titleService: Title, private errorService: ErrorMessagesService, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    this.titleService.setTitle('Login | EDI');
    this.loginId = new FormControl(null, [Validators.required, EdiValidators.whitespace()]);
    this.password = new FormControl(null, Validators.required);
    this.mfaToken = new FormControl(null,
      { validators: [Validators.required, Validators.minLength(6)] });
    this.loginForm = new FormGroup({
      loginId: this.loginId,
      password: this.password,
      mfaToken: this.mfaToken
    }, { updateOn: 'blur' });
  }

  onSubmit() {
    // There is no session yet
    this.authService.logout(); // Logout from previous session if there is one
    this.errorService.clear();
    this.errorMsgs = [];

    this.formService.touchControls(this.loginForm);

    this.errorMsgs = this.formService.validateControlsAndGetList(this.loginForm, 'login');

    if (this.errorMsgs.length === 0) {

      let loginData = {
        username: this.loginForm.get('loginId').value,
        password: this.loginForm.get('password').value,
        mfaToken: this.loginForm.get('mfaToken').value
      };

      this.apiService.doLogin(loginData)
        .subscribe(resp => {
          let errorsTemp = this.responseService.validateResponse(resp);
          let data = resp.result;
          this.sessionService.setCurrentUser(data);

          if (errorsTemp.length === 0) {
            this.authService.setToken(data['token']);
            this.authService.setRefreshToken(data['refreshToken']);
            this.router.navigate(['login', 'warning']);
          } else {
            this.validateErrorResponse(errorsTemp, data);
            this.formService.resetForm(this.loginForm);      
          }
        });
    }
  }

  validateErrorResponse(errors: any[], data: any) {
    if (errors[0].detail === this.constants.REVIEW_EMAIL) { // INACTIVE
      this.authService.validated = true;
      if (data && data['token'] && data['refreshToken']) { // OOS token
        this.authService.setToken(data['token']);
        this.authService.setRefreshToken(data['refreshToken']);
      }
      this.router.navigate(['self-help', 'verifyEmail']);
    } else if (errors[0].detail === this.constants.PW_CHANGE_180DAY) { // PW EXPIRED
      this.authService.validated = true;
      if (data && data['token'] && data['refreshToken']) { // OOS token
        this.authService.setToken(data['token']);
        this.authService.setRefreshToken(data['refreshToken']);
      }
      this.router.navigate(['self-help', 'resetExpiredPassword']);
    } else {
      this.errorMsgs = errors;
    }
    let comp = this;
  }

  forgotUsername() {
    this.router.navigate(['validatePersonInfo', this.constants.FORGOT_LOGIN_ID]);
  }

  forgotPassword() {
    this.router.navigate(['validatePersonInfo', this.constants.FORGOT_PASSWORD_NO_PIN]);
  }

  goToCob() {
    this.document.location.href = environment.url;
  }

  ngOnDestroy() {
    this.errorService.clear();
  }

}
