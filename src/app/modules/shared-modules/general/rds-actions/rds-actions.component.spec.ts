import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { RdsSelectComponent } from '../rds-select/rds-select.component';

import { RdsActionsComponent } from './rds-actions.component';

describe('RdsActionsComponent', () => {
  let component: RdsActionsComponent;
  let fixture: ComponentFixture<RdsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RdsActionsComponent, RdsSelectComponent],
      providers: [NgControl],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
