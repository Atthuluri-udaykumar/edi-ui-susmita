import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RdsSelectComponent} from './rds-select.component';
import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {Component} from '@angular/core';

@Component({
  template: `<app-rds-select [(ngModel)]="val"></app-rds-select>`
})
class TestRdsSelectComponent {
  val: string;
}

describe('RdsSelectComponent', () => {
  let component: RdsSelectComponent;
  let testComponent: TestRdsSelectComponent;
  let fixture: ComponentFixture<TestRdsSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RdsSelectComponent, TestRdsSelectComponent],
      providers: [NgControl],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRdsSelectComponent);
    component = fixture.debugElement.children[0].componentInstance;
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
