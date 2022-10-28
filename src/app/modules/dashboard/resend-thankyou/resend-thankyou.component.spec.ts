import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendThankyouComponent } from './resend-thankyou.component';

describe('ResendThankyouComponent', () => {
  let component: ResendThankyouComponent;
  let fixture: ComponentFixture<ResendThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendThankyouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
