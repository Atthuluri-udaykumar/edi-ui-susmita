import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RdsDateComponent} from './rds-date.component';
import {Component} from '@angular/core';
import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  template: `<app-rds-date [(ngModel)]="val"></app-rds-date>`
})
class TestRdsDateComponent {
  val: string;
}

describe('RdsDateComponent', () => {
  let component: RdsDateComponent;
  let testComponent: TestRdsDateComponent;
  let fixture: ComponentFixture<TestRdsDateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RdsDateComponent, TestRdsDateComponent],
      providers: [NgControl],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRdsDateComponent);
    component = fixture.debugElement.children[0].componentInstance;
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
