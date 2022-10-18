import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RdsCheckboxComponent} from './rds-checkbox.component';
import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {Component} from '@angular/core';

@Component({
  template: `<app-rds-checkbox [(ngModel)]="val"></app-rds-checkbox>`
})
class TestRdsCheckboxComponent {
  val: string;
}

describe('RdsCheckboxComponent', () => {
  let component: RdsCheckboxComponent;
  let testComponent: TestRdsCheckboxComponent;
  let fixture: ComponentFixture<TestRdsCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RdsCheckboxComponent, TestRdsCheckboxComponent],
      providers: [NgControl],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRdsCheckboxComponent);
    component = fixture.debugElement.children[0].componentInstance;
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
