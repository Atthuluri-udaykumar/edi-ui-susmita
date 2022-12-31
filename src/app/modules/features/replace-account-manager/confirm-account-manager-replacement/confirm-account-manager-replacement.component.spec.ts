/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConfirmAccountManagerReplacementComponent } from './confirm-account-manager-replacement.component';

describe('ConfirmAccountManagerReplacementComponent', () => {
  let component: ConfirmAccountManagerReplacementComponent;
  let fixture: ComponentFixture<ConfirmAccountManagerReplacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAccountManagerReplacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAccountManagerReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
