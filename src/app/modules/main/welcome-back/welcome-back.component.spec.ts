import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {WelcomeBackComponent} from './welcome-back.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SessionService} from '../../../services/session.service';
import {SessionStorageService} from '../../../utils/web-storage/service/web-storage.service';
import {Person} from '../../../model/person.model';
import {PersonSecurityDetail} from '../../../model/personSecurityDetail.model';
import {ApiService} from '../../../services/api.service';
import {GeneralModule} from '../../shared-modules/general/general.module';

describe('WelcomeBackComponent', () => {
  let component: WelcomeBackComponent;
  let fixture: ComponentFixture<WelcomeBackComponent>;
  let service: SessionService;

  beforeEach(waitForAsync(() => {
    const mockService = new SessionService(new SessionStorageService(), new ApiService(null, null));
    let mockPerson = new Person();
    mockPerson.personId = 1;
    mockPerson.userName = 'user';
    mockPerson.phoneNumber = '2458785869';
    mockPerson.emailAddress = 'example@example.com';
    mockPerson.personSecurityDetail = new PersonSecurityDetail();
    mockPerson.personSecurityDetail.lastLoginTimestamp = new Date();
    mockService.current_user.next(mockPerson);

    TestBed.configureTestingModule({
      declarations: [WelcomeBackComponent],
      imports: [RouterTestingModule, GeneralModule],
      providers: [{provide: SessionService, useValue: mockService}, SessionStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(SessionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set first time true if lastlogintime is undefined', () => {
    service.current_user.getValue().personSecurityDetail.lastLoginTimestamp = null;
    component.ngOnInit();
    expect(component.firstTime).toBeTruthy();
  });

  it('should navigate to plan list when click continue', () => {
    let navigateSpy = spyOn((<any>component).router, 'navigate');
    component.continueToPsList();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

});
