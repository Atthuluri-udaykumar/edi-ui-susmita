

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogModule } from 'primeng-lts/dialog';
import { of } from 'rxjs';
import { MockApiService } from 'src/app/mocks/mock-api.service';
import { Person } from 'src/app/model/person.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomRenderer } from 'src/app/services/custom-renderer.service';
import { SessionService } from 'src/app/services/session.service';
import { SessionStorageService } from 'src/app/utils/web-storage/web-storage.module';
import { LoginPasswordService } from '../../shared-modules/forms/login-password-form/login-password.service';
import { GeneralModule } from '../../shared-modules/general/general.module';
import { ChangePasswordComponent } from './change-password.component';



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

});

