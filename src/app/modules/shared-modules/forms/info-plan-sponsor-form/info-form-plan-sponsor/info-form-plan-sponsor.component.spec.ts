import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {InfoFormPlanSponsorComponent} from './info-form-plan-sponsor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputMaskModule} from 'primeng-lts/inputmask';
import {SafePipe} from '../../../../../pipes/safe.pipe';
import {DropDownService} from '../../../../../services/drop-down.service';
import {RdsInputComponent} from '../../../general/rds-input/rds-input.component';
import {RdsInputWrapperComponent} from '../../../general/rds-input-wrapper/rds-input-wrapper.component';
import {NoStarPipe} from '../../../../../pipes/no-star.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RdsSelectComponent } from '../../../general/rds-select/rds-select.component';
import { MockApiService } from 'src/app/mocks/mock-api.service';

describe('InfoFormPlanSponsorComponent', () => {
  let component: InfoFormPlanSponsorComponent;
  let fixture: ComponentFixture<InfoFormPlanSponsorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InfoFormPlanSponsorComponent, SafePipe, RdsInputComponent, RdsInputWrapperComponent, NoStarPipe, RdsSelectComponent],
      imports: [FormsModule, ReactiveFormsModule, InputMaskModule, RouterTestingModule, HttpClientTestingModule],
      providers: [DropDownService, {provide: ApiService, useClass: MockApiService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFormPlanSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update cancel button label to return button when Manage Plan Sponsor Page', () => {
    component.psAuthRep = true;
    component.ngOnInit();
    expect(component.cancelButton).toBe('Return');
  });

  it('should emit submit event when submit is triggered', () => {
    let submitSpy = spyOn(component.pressSubmit, 'emit');
    component.onSubmit();
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should emit submit event when cancel is triggered', () => {
    let cancelSpy = spyOn(component.pressCancel, 'emit');
    component.back();
    expect(cancelSpy).toHaveBeenCalled();
  });
});
