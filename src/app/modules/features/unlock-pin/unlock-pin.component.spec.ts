import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockPinComponent } from './unlock-pin.component';

describe('UnlockPinComponent', () => {
  let component: UnlockPinComponent;
  let fixture: ComponentFixture<UnlockPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
