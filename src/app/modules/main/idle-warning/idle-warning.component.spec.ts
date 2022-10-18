import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {IdleWarningComponent} from './idle-warning.component';
import {DialogModule} from 'primeng-lts/dialog';
import {RouterTestingModule} from '@angular/router/testing';

describe('IdleWarningComponent', () => {
  let component: IdleWarningComponent;
  let fixture: ComponentFixture<IdleWarningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IdleWarningComponent],
      imports: [DialogModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
