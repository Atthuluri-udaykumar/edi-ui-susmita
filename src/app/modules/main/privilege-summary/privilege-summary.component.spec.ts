import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PrivilegeSummaryComponent} from './privilege-summary.component';
import {SessionService} from '../../../services/session.service';
import {ApiService} from '../../../services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {SessionStorageService} from '../../../utils/web-storage/service/web-storage.service';
import {CardModule} from 'primeng-lts/card';
import {GeneralModule} from '../../shared-modules/general/general.module';

describe('PrivilegeSummaryComponent', () => {
  let component: PrivilegeSummaryComponent;
  let fixture: ComponentFixture<PrivilegeSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PrivilegeSummaryComponent],
      imports: [HttpClientModule, CardModule, GeneralModule],
      providers: [SessionService, ApiService, SessionStorageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
