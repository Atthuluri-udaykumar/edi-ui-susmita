import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import {LoginPasswordComponent} from './login-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GeneralModule} from '../../../general/general.module';
import {LoginPasswordService} from '../login-password.service';
import {RouterTestingModule} from '@angular/router/testing';
import {CustomRenderer} from '../../../../../services/custom-renderer.service';

describe('LoginPasswordComponent', () => {
  let component: LoginPasswordComponent;
  let fixture: ComponentFixture<LoginPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, GeneralModule, RouterTestingModule],
      declarations: [LoginPasswordComponent],
      providers: [LoginPasswordService, CustomRenderer]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pi-check class when expression is truthy', () => {
    component.evaluate(component.loginCase, true);
    expect(component.loginCase.nativeElement.classList.contains('pi-check')).toBeTruthy();
  });

  it('should set pi-times class when expression is falsy', () => {
    component.evaluate(component.loginCase, false);
    expect(component.loginCase.nativeElement.classList.contains('pi-times')).toBeTruthy();
  });

  it('should set pi-check-circle class when expression is truthy', () => {
    component.evaluateSub(component.pass1SpChar, true);
    expect(component.pass1SpChar.nativeElement.classList.contains('pi-check-circle')).toBeTruthy();
  });

  it('should set pi-times-circle class when expression is falsy', () => {
    component.evaluateSub(component.pass1SpChar, false);
    expect(component.pass1SpChar.nativeElement.classList.contains('pi-times-circle')).toBeTruthy();
  });

  it('should set focus on next element when target.id is passwordReentered', fakeAsync(() => {
    component.nextElementFocus = {
      focus: () => {
      }
    };
    const spy = spyOn(component.nextElementFocus, 'focus');
    component.onTab({
      target: {id: 'passwordReentered'}, preventDefault: () => {
      }
    });

    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));

  it('should set focus on previous element when target.id is reservedWords', fakeAsync(() => {
    component.loginEl = <any>{
      inputElement: {
        nativeElement: {
          focus: () => {
          }
        }
      }
    };
    const spy = spyOn(component.loginEl['inputElement'].nativeElement, 'focus');

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
    component.passReEl = <any>{
      inputElement: {
        nativeElement: {
          focus: () => {
          }
        }
      }
    };
    const spy = spyOn(component.passReEl['inputElement'].nativeElement, 'focus');

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

  it('should evaluate login rules if loginId is entered', () => {
    let evaluate = spyOn(component, 'evaluate');
    component.loginPassForm.get('loginId').setValue('value');
    expect(evaluate).toHaveBeenCalled();
  });

  it('should evaluate password rules if password is entered', () => {
    let evaluate = spyOn(component, 'evaluate');
    component.loginPassForm.get('password').setValue('value');
    expect(evaluate).toHaveBeenCalled();
  });
});
