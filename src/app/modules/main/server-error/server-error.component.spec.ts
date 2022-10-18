import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ServerErrorComponent} from './server-error.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../../services/auth.service';
import {ErrorMessagesService} from '../../shared-modules/general/error-messages/error-messages.service';
import {SessionStorageService} from '../../../utils/web-storage/web-storage.module';
import {SessionService} from '../../../services/session.service';
import {ApiService} from '../../../services/api.service';
import {HttpClientModule} from '@angular/common/http';

describe('ServerErrorComponent', () => {
  let component: ServerErrorComponent;
  let fixture: ComponentFixture<ServerErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ServerErrorComponent],
      providers: [AuthService, SessionService, ApiService, ErrorMessagesService, SessionStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
