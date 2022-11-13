import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittersRequiringComponent } from './submitters-requiring.component';

describe('SubmittersRequiringComponent', () => {
  let component: SubmittersRequiringComponent;
  let fixture: ComponentFixture<SubmittersRequiringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittersRequiringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittersRequiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
