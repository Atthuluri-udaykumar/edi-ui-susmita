import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import {ChangePasswordComponent} from './change-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GeneralModule} from '../../../general/general.module';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginPasswordService} from '../../login-password-form/login-password.service';
import {CustomRenderer} from '../../../../../services/custom-renderer.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {SessionStorageService} from '../../../../../utils/web-storage/service/web-storage.service';
import {DialogModule} from 'primeng-lts/dialog';
import {ApiService} from '../../../../../services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {SessionService} from '../../../../../services/session.service';
import {Person} from '../../../../../model/person.model';
import {MockApiService} from '../../../../../mocks/mock-api.service';
import {AuthService} from '../../../../../services/auth.service';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let apiService: MockApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, GeneralModule, RouterTestingModule, DialogModule, HttpClientModule],
      declarations: [ChangePasswordComponent],
      providers: [LoginPasswordService, CustomRenderer, AuthService, SessionService, SessionStorageService,
        {provide: ApiService, useClass: MockApiService}, {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {routeConfig: {path: 'changeExpiredPassword'}},
            url: of('value')
          }
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.get(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to login when they close the success dialog', () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.closeDialog();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('should navigate back to login when they click the cancel button', () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.back();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });


  it('should set pi-check-circle class when expression is truthy', () => {
    component.evaluateSub(component.pass1SpChar, true);
    expect(component.pass1SpChar.nativeElement.classList.contains('pi-check-circle')).toBeTruthy();
  });

  it('should set pi-times-circle class when expression is falsy', () => {
    component.evaluateSub(component.pass1SpChar, false);
    expect(component.pass1SpChar.nativeElement.classList.contains('pi-times-circle')).toBeTruthy();
  });

  it('should set focus on previous element when target.id is reservedWords', fakeAsync(() => {
    component.loginEl = {
      nativeElement: {
        focus: () => {
        }
      }
    };
    const spy = spyOn(component.loginEl.nativeElement, 'focus');

    component.onTab({
      target: {id: 'reservedWords'}, preventDefault: () => {
      }
    });

    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();

  }));

  it('should set focus on passGuide element when target.id is focusSwitch', fakeAsync(() => {
    component.passGuide = {
      nativeElement: {
        focus: () => {
        }
      }
    };
    const spy = spyOn(component.passGuide.nativeElement, 'focus');

    component.onFocus({
      target: {id: 'focusSwitch'}, preventDefault: () => {
      }
    });

    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));

  it('should not set focus on passGuide element when target.id is different than focusSwitch', fakeAsync(() => {
    component.passGuide = {
      nativeElement: {
        focus: () => {
        }
      }
    };
    const spy = spyOn(component.passGuide.nativeElement, 'focus');

    component.onFocus({
      target: {id: 'other'}, preventDefault: () => {
      }
    });

    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(0);
  }));

  it('should not set focus on next element when nextElement is undefined', () => {
    component.nextElementFocus = undefined;

    component.onTab({
      target: {id: 'passwordReentered'}, preventDefault: () => {
      }
    });
    expect(component.nextElementFocus).toBeFalsy();
  });

  it('should set focus on PasswordReenter field when target.id is reservedWords', fakeAsync(() => {
    component.passReEl = {
      nativeElement: {
        focus: () => {
        }
      }
    };
    const spy = spyOn(component.passReEl.nativeElement, 'focus');

    component.onShiftTab({
      target: {id: 'reservedWords'}, preventDefault: () => {
      }
    });

    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));

  it('should set focus on Previous element field when target.id is logPassGuides', fakeAsync(() => {

    component.previousElementFocus = {
      el: {
        nativeElement: {
          children: [{
            focus: () => {
            }
          }]
        }
      }
    };
    const spy = spyOn(component.previousElementFocus.el.nativeElement.children[0], 'focus');

    component.onShiftTab({
      target: {id: 'logPassGuides'}, preventDefault: () => {
      }
    });

    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));

  it('should evaluate password rules if password is entered', () => {
    let evaluate = spyOn(component, 'evaluate');
    component.loginPassForm.get('password').setValue('value');
    expect(evaluate).toHaveBeenCalled();
  });

  it('should have errors if user submits empty values', () => {
    component.submit();
    expect(component.errorMsgs.length).toBeGreaterThan(0);
  });

  it('should set showConfirmation variable to true if reset password Transaction from the Backend is successful', () => {
    component.user = new Person();
    component.user.userName = '';
    component.user.password = '';
    component.loginPassForm.get('loginId').setValue('valueUser');
    component.loginPassForm.get('password').setValue('hH1#hhhh');
    component.loginPassForm.get('rePassword').setValue('hH1#hhhh');
    component.submit();
    expect(component.showConfirmation).toBeTruthy();
  });

  it('should have errors if response comes with errors', () => {
    component.user = new Person();
    component.user.userName = '';
    component.user.password = '';
    component.loginPassForm.get('loginId').setValue('valueUser');
    component.loginPassForm.get('password').setValue('hH1#hhhh');
    component.loginPassForm.get('rePassword').setValue('hH1#hhhh');
    apiService.failFlag = true;
    component.submit();
    expect(component.errorMsgs.length).toBeGreaterThan(0);
  });

  it('should set error if passwords dont match', () => {
    component.user = new Person();
    component.user.userName = '';
    component.user.password = '';
    component.loginPassForm.get('loginId').setValue('valueUser');
    component.loginPassForm.get('password').setValue('hH1#hhhh');
    component.loginPassForm.get('rePassword').setValue('hH1#hahh');
    component.submit();
    expect(component.errorMsgs.length).toBeGreaterThan(0);
  });
});
