import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockUserAccountComponent } from './unlock-user-account.component';

describe('UnlockUserAccountComponent', () => {
  let component: UnlockUserAccountComponent;
  let fixture: ComponentFixture<UnlockUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockUserAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
