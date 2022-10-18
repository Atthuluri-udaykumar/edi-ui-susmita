import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RdsDobWrapperComponent} from './rds-dob-wrapper.component';

describe('RdsDobWrapperComponent', () => {
  let component: RdsDobWrapperComponent;
  let fixture: ComponentFixture<RdsDobWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RdsDobWrapperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsDobWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not subscribe to changes if form input values are null', () => {
    component.ctrlMonth = null;
    component.ctrlDay = null;
    component.ctrlYear = null;
    component.ngAfterContentInit();
    expect(component).toBeTruthy();
  });
});
