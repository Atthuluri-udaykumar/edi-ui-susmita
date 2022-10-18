import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SessionExceptionComponent} from './session-exception.component';
import {SessionService} from '../../../services/session.service';
import {SessionStorageService} from '../../../utils/web-storage/web-storage.module';
import {ApiService} from '../../../services/api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('SessionExceptionComponent', () => {
  let component: SessionExceptionComponent;
  let fixture: ComponentFixture<SessionExceptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SessionExceptionComponent],
      providers: [SessionService, SessionStorageService, ApiService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
