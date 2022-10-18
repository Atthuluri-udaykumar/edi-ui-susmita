import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { CalendarModule } from "primeng-lts/calendar";
import { InputMaskModule } from "primeng-lts/inputmask";
import { MockApiService } from "src/app/mocks/mock-api.service";
import { Person } from "src/app/model/person.model";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import { CustomRenderer } from "src/app/services/custom-renderer.service";
import { DateUtilService } from "src/app/services/date-util.service";
import { DropDownService } from "src/app/services/drop-down.service";
import { SessionService } from "src/app/services/session.service";
import { SessionStorageService } from "src/app/utils/web-storage/web-storage.module";
import { InvitedRegistrationService } from "../../registration/invited-registration/invited-registration.service";
import { PersonalInfoComponent } from "../../shared-modules/forms/info-person-form/personal-info/personal-info.component";
import { ErrorMessagesService } from "../../shared-modules/general/error-messages/error-messages.service";
import { GeneralModule } from "../../shared-modules/general/general.module";
import { UserProfileComponent } from "./user-profile.component";

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  let originalTimeout;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [GeneralModule, ReactiveFormsModule, CalendarModule, InputMaskModule, NoopAnimationsModule, RouterTestingModule, HttpClientModule],
      providers: [DropDownService, CustomRenderer, InvitedRegistrationService, ErrorMessagesService, DateUtilService, AuthService,
        SessionStorageService, SessionService, { provide: ApiService, useClass: MockApiService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    let session = TestBed.inject(SessionService);
    let person = new Person();
    person.userName = 'usr';
    session.current_user.next(person)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
