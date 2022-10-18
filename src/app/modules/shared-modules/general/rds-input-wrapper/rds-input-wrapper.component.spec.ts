import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RdsInputWrapperComponent} from './rds-input-wrapper.component';

describe('RdsInputWrapperComponent', () => {
  let component: RdsInputWrapperComponent;
  let fixture: ComponentFixture<RdsInputWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RdsInputWrapperComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsInputWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
