import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RdsListComponent} from './rds-list.component';
import {RdsSelectComponent} from '../rds-select/rds-select.component';
import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {Component} from '@angular/core';

@Component({
  template: `
    <app-rds-list [(ngModel)]="val"></app-rds-list>`
})
class TestRdsListComponent {
  val: any = [];
}

describe('RdsListComponent', () => {

  let component: RdsListComponent;
  let testComponent: TestRdsListComponent;
  let fixture: ComponentFixture<TestRdsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RdsListComponent, TestRdsListComponent, RdsSelectComponent],
      providers: [NgControl],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRdsListComponent);
    component = fixture.debugElement.children[0].componentInstance;
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
