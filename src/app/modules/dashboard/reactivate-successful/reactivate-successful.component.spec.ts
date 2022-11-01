import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateSuccessfulComponent } from './reactivate-successful.component';

describe('ReactivateSuccessfulComponent', () => {
  let component: ReactivateSuccessfulComponent;
  let fixture: ComponentFixture<ReactivateSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivateSuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivateSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
