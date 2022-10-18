import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../../services/auth.service';
import {SessionStorageService} from '../../../utils/web-storage/service/web-storage.service';
import {GeneralModule} from '../../shared-modules/general/general.module';
import {MenubarModule} from 'primeng-lts/menubar';
import {SessionService} from '../../../services/session.service';
import {ApiService} from '../../../services/api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, GeneralModule, MenubarModule, HttpClientTestingModule],
      providers: [AuthService, SessionService, ApiService, SessionStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
