import {TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AuthService} from './services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {RegistrationService} from './services/registration.service';
import {SessionStorageService} from './utils/web-storage/service/web-storage.service';
import {SessionService} from './services/session.service';
import {TimeoutService} from './services/timeout.service';
import {HeaderComponent} from './modules/layout/header/header.component';
import {FooterComponent} from './modules/layout/footer/footer.component';
import {Constants} from './services/constants';
import {GeneralModule} from './modules/shared-modules/general/general.module';
import {CustomRenderer} from './services/custom-renderer.service';
import {IdleWarningComponent} from './modules/main/idle-warning/idle-warning.component';
import {DialogModule} from 'primeng-lts/dialog';
import {ApiService} from './services/api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MenubarModule} from 'primeng-lts/menubar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AppComponent', () => {

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
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        IdleWarningComponent
      ],
      imports: [
        FormsModule, ReactiveFormsModule, ReactiveFormsModule,
        RouterTestingModule, HttpClientTestingModule, GeneralModule, DialogModule, MenubarModule,
      ],
      providers: [
        AuthService, RegistrationService, ApiService,
        SessionStorageService, SessionService, TimeoutService, Constants, CustomRenderer
      ]
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  it('should render an app-footer tag', (() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  }));
  it('should render an app-header tag', (() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  }));

});
