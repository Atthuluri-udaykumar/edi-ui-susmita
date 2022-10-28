import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendTokenComponent } from './resend-token.component';

describe('ResendTokenComponent', () => {
  let component: ResendTokenComponent;
  let fixture: ComponentFixture<ResendTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
