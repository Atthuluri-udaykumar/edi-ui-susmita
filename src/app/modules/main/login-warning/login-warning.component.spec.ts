import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LoginWarningComponent} from './login-warning.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../../services/auth.service';
import {SessionStorageService} from '../../../utils/web-storage/service/web-storage.service';
import {SessionService} from '../../../services/session.service';
import {ApiService} from '../../../services/api.service';
import {MockApiService} from '../../../mocks/mock-api.service';
import {Person} from '../../../model/person.model';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoginWarningComponent', () => {
  let component: LoginWarningComponent;
  let fixture: ComponentFixture<LoginWarningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginWarningComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, SessionStorageService, {
        provide: ApiService,
        useClass: MockApiService
      }, SessionService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWarningComponent);
    component = fixture.componentInstance;

    let sessionService = TestBed.inject(SessionService);
    let testuser = new Person();
    testuser.personId = 12345;
    testuser.role = 2;
    sessionService.setCurrentUser(testuser);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page if user accepts', () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.accept();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should navigate to login page if user declines', async () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    let session = TestBed.inject(SessionService);
    const testPerson = new Person();
    testPerson.personId = 123;
    testPerson.userName = 'username';
    testPerson.role = 4;
    session.current_user.next(testPerson);
    await component.decline();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

});
