import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReactivateComponent } from './confirm-reactivate.component';

describe('ConfirmReactivateComponent', () => {
  let component: ConfirmReactivateComponent;
  let fixture: ComponentFixture<ConfirmReactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmReactivateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
