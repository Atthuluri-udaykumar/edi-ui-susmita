import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {AuthService} from '../../../services/auth.service';
import {ApiService} from '../../../services/api.service';
import {SessionStorageService} from '../../../utils/web-storage/service/web-storage.service';
import {SessionService} from '../../../services/session.service';
import {TimeoutService} from '../../../services/timeout.service';
import {GeneralModule} from '../../shared-modules/general/general.module';
import {Constants} from '../../../services/constants';
import {CustomRenderer} from '../../../services/custom-renderer.service';
import {MockApiService} from '../../../mocks/mock-api.service';
import {DialogModule} from 'primeng-lts/dialog';
import {SuccessDialogModule} from '../../shared-modules/success-dialog/success-dialog.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiService: MockApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        GeneralModule,
        DialogModule,
        SuccessDialogModule
      ],
      providers: [AuthService, AuthService, HttpClient, HttpHandler, {
        provide: ApiService,
        useClass: MockApiService
      }, SessionStorageService, SessionService, TimeoutService, Constants, CustomRenderer],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.get(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 2 controls', () => {
    expect(component.loginForm.contains('loginId')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate that loginId control is required', () => {
    const control = component.loginForm.get('loginId');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should validate that password control is required', () => {
    const control = component.loginForm.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should navigate to validatePerson Info if click on forgot loginId', () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.forgotUsername();
    expect(navigateSpy).toHaveBeenCalledWith(['validatePersonInfo', 'forgotLogin']);
  });

  it('should navigate to validatePerson Info if click on forgot password', () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.forgotPassword();
    expect(navigateSpy).toHaveBeenCalledWith(['validatePersonInfo', 'forgotPasswordNoPin']);
  });

  it('should navigate to validatePerson Info if click on Manage Mfa', () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.setUpVerifyCode();
    expect(navigateSpy).toHaveBeenCalledWith(['validatePersonInfo', 'ManageMfa']);
  });

  it('should have errors if user submits empty data', () => {
    component.onSubmit();
    expect(component.errorMsgs.length).toBeGreaterThan(0);
  });

  it('should not have errors if user submits good data', () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.loginId.setValue('userValid');
    component.password.setValue('passValid');
    component.mfaToken.setValue('123556');
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['login', 'warning']);
    expect(component.errorMsgs.length).toBe(0);
  });

  it('should redirect to review email page if email is not good', () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.loginId.setValue('userValid');
    component.password.setValue('passValid');
    component.mfaToken.setValue('123556');
    apiService.failFlag = true;
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['self-help', 'verifyEmail']);
  });

  // it('should navigate to changeExpiredPassword if user password expired', () => {
  //   let navigateSpy = spyOn((<any>component).router, 'navigate');
  //   component.validateErrorResponse([{detail: 'PW_EXPIRED'}]);
  //   expect(navigateSpy).toHaveBeenCalledWith(['/changeExpiredPassword']);
  // });

  // it('should if user is disabled setTimeout is called to listen for resend link click', () => {
  //   spyOn(window, 'setTimeout');
  //   component.validateErrorResponse([{detail: 'disabled'}]);
  //   expect(setTimeout).toHaveBeenCalled();
  // });

  it('should have errors if call to backend sends back error', () => {
    apiService.failFlag = true;
    component.sendDisabledAccountEmail(apiService);
    expect(component.errorMsgs.length).toBeGreaterThan(0);
  });

  it('should show success email popup if call to backend for sending reactivation token succeeds', () => {
    component.sendDisabledAccountEmail(apiService);
    expect(component.showEmailSuccess).toBeTruthy();
  });

});
