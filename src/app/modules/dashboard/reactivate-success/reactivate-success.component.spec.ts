import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateSuccessComponent } from './reactivate-success.component';

describe('ReactivateSuccessComponent', () => {
  let component: ReactivateSuccessComponent;
  let fixture: ComponentFixture<ReactivateSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivateSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
