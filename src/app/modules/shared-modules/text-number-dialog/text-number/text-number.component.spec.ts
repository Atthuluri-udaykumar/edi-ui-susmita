import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TextNumberComponent} from './text-number.component';
import {DialogModule} from 'primeng-lts/dialog';
import {GeneralModule} from '../../general/general.module';
import {ReactiveFormsModule} from '@angular/forms';
import {InputMaskModule} from 'primeng-lts/inputmask';
import {ApiService} from '../../../../services/api.service';
import {MockApiService} from '../../../../mocks/mock-api.service';
import {HttpClientModule} from '@angular/common/http';
import {SessionService} from '../../../../services/session.service';
import {AuthService} from '../../../../services/auth.service';
import {SessionStorageService} from '../../../../utils/web-storage/service/web-storage.service';
import {Person} from '../../../../model/person.model';
import {CustomRenderer} from '../../../../services/custom-renderer.service';
import {MockElementRef} from '../../../../mocks/mock-element-ref';

describe('TextNumberComponent', () => {
  let component: TextNumberComponent;
  let fixture: ComponentFixture<TextNumberComponent>;

  let mockService = new SessionService(new SessionStorageService(), new ApiService(null, null));
  let mockPerson = new Person();
  mockPerson.userName = 'user';
  mockPerson.textEnabledNumber = '2458785869';
  mockPerson.emailAddress = '';
  mockService.current_user.next(mockPerson);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextNumberComponent],
      imports: [DialogModule, GeneralModule, ReactiveFormsModule, InputMaskModule, HttpClientModule],
      providers: [CustomRenderer, {provide: ApiService, useClass: MockApiService}, {provide: SessionService, useValue: mockService},
        AuthService, SessionStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should reset dialog error and verification number when user closes TEN popup before completing', () => {
    component.closeDialog();
    expect(component.errorMsgs.length).toBe(0);
    expect(component.verificationNumber).toEqual('');
  });

  it('should send sms with verification number when user provides a valid number presses send', () => {
    component.textEnabledNumber.setValue('6414854578');
    component.verificationField = new MockElementRef({});
    let number = component.send();
    expect(component.errorMsgs.length).toBe(0);
  });

  it('should validate and show confirmation dialog when user submits valid verification number', () => {
    component.textEnabledNumber.setValue('6414854578');
    component.verificationNumber = '548695';
    component.verificationCode.setValue('548695');
    component.verificationField = new MockElementRef({});
    component.submit();
    expect(component.displayConfirmation).toBeTruthy();
  });

  it('should have errors if verification code is invalid', () => {
    component.textEnabledNumber.setValue('6414854578');
    component.verificationNumber = '548695';
    component.verificationCode.setValue('548692');
    component.submit();
    expect(component.errorMsgs.length).toBeGreaterThan(0);
  });

  it('should have error if user does not provide text enabled number', () => {
    component.textEnabledNumber.setValue('');
    let number = component.send();
    expect(component.errorMsgs.length).toBeGreaterThan(0);
  });

  it('should have error if user does not provide a valid text enabled number', () => {
    component.textEnabledNumber.setValue('1234');
    component.verificationField = new MockElementRef({});
    let number = component.send();
    expect(component.errorMsgs.length).toBeGreaterThan(0);
  });
});
