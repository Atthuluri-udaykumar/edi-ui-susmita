import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RdsCheckboxWrapperComponent} from './rds-checkbox-wrapper.component';

describe('RdsCheckboxComponent', () => {
  let component: RdsCheckboxWrapperComponent;
  let fixture: ComponentFixture<RdsCheckboxWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RdsCheckboxWrapperComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsCheckboxWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
