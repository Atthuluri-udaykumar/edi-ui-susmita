import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SecurityQuestionsComponent} from './security-questions.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GeneralModule} from '../../../general/general.module';
import {CustomRenderer} from '../../../../../services/custom-renderer.service';
import {ApiService} from '../../../../../services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {SessionService} from '../../../../../services/session.service';
import {SessionStorageService} from '../../../../../utils/web-storage/service/web-storage.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Person} from '../../../../../model/person.model';
import {PersonSecurityDetail} from '../../../../../model/personSecurityDetail.model';
import {MockApiService} from '../../../../../mocks/mock-api.service';
import {MockElementRef} from '../../../../../mocks/mock-element-ref';
import {Constants} from '../../../../../services/constants';
import {SuccessDialogModule} from '../../../success-dialog/success-dialog.module';
import {AuthService} from '../../../../../services/auth.service';

describe('SecurityQuestionsComponent', () => {
  let component: SecurityQuestionsComponent;
  let fixture: ComponentFixture<SecurityQuestionsComponent>;
  let service: SessionService;
  let apiService: MockApiService;

  beforeEach(waitForAsync(() => {

    let mockService = new SessionService(new SessionStorageService(), new ApiService(null, null));
    let mockPerson = new Person();
    mockPerson.userName = 'user';
    mockPerson.textEnabledNumber = '2458785869';
    mockPerson.emailAddress = '';
    mockPerson.personSecurityDetail = new PersonSecurityDetail();
    mockPerson.personSecurityDetail.question1 = '1';
    mockPerson.personSecurityDetail.question2 = '2';
    mockService.current_user.next(mockPerson);

    TestBed.configureTestingModule({
      declarations: [SecurityQuestionsComponent],
      imports: [GeneralModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule, SuccessDialogModule],
      providers: [CustomRenderer, AuthService, {provide: ApiService, useClass: MockApiService},
        SessionService, Constants, SessionStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionsComponent);
    component = fixture.componentInstance;

    let sessionService = TestBed.inject(SessionService);

    let mockPerson = new Person();
    mockPerson.userName = 'user';
    mockPerson.textEnabledNumber = '2458785869';
    mockPerson.emailAddress = '';
    mockPerson.personSecurityDetail = new PersonSecurityDetail();
    mockPerson.personSecurityDetail.question1 = '1';
    mockPerson.personSecurityDetail.question2 = '2';

    sessionService.current_user.next(mockPerson);

    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should show first error when answerCount 1', () => {
  //   service.current_user.value.personSecurityDetail.securityAnswerCount = 1;
  //   component.ngOnInit();
  //   expect(component.warningMsgs.length).toBe(1);
  // });

  // it('should show first error when answerCount 2', () => {
  //   service.current_user.value.personSecurityDetail.securityAnswerCount = 2;
  //   component.ngOnInit();
  //   expect(component.warningMsgs.length).toBe(1);
  // });

  // it('should navigate to reset password page if user enters valid answers', () => {
  //   let navigateSpy = spyOn((<any>component).router, 'navigate');
  //   component.answer1.setValue('value');
  //   component.answer2.setValue('value');
  //   component.onSubmit();
  //   expect(navigateSpy).toHaveBeenCalledWith(['/changeExpiredPassword']);
  // });

  // it('should have errors if user provides wrong answers', () => {
  //   apiService.failFlag = true;
  //   component.answer1.setValue('value');
  //   component.answer2.setValue('value');
  //   component.element = new MockElementRef({});
  //   component.onSubmit();
  //   expect(component.errorMsgs.length).toBeGreaterThan(0);
  // });

  // it('should have errors if user does not provide answers', () => {
  //   component.element = new MockElementRef({});
  //   component.onSubmit();
  //   expect(component.errorMsgs.length).toBeGreaterThan(0);
  // });

  // it('should have errors if secureQuestions are locked', () => {
  //   apiService.failFlag = true;
  //   component.answer1.setValue('value');
  //   component.answer2.setValue('value');
  //   component.element = new MockElementRef({});
  //   component.user.personSecurityDetail.securityAnswerCount = 3;
  //   component.onSubmit();
  //   expect(component.questionsLocked).toBeTruthy();
  // });
});
