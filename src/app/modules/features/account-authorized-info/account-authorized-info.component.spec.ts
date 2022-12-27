import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAuthorizedInfoComponent } from './account-authorized-info.component';

describe('AccountAuthorizedInfoComponent', () => {
  let component: AccountAuthorizedInfoComponent;
  let fixture: ComponentFixture<AccountAuthorizedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAuthorizedInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAuthorizedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
