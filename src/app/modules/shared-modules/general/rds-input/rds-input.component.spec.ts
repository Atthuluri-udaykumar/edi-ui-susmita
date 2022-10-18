import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RdsInputComponent} from './rds-input.component';
import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {Component} from '@angular/core';
import {NoStarPipe} from '../../../../pipes/no-star.pipe';
import {RouterTestingModule} from '@angular/router/testing';

@Component({
  template: `<app-rds-input [(ngModel)]="val"></app-rds-input>`
})
class TestRdsInputComponent {
  val: string;
}

describe('RdsInputComponent', () => {
  let component: RdsInputComponent;
  let testComponent: TestRdsInputComponent;
  let fixture: ComponentFixture<TestRdsInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RdsInputComponent, TestRdsInputComponent, NoStarPipe],
      providers: [NgControl],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRdsInputComponent);
    component = fixture.debugElement.children[0].componentInstance;
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
