import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAuthorizedComponent } from './account-authorized.component';

describe('AccountAuthorizedComponent', () => {
  let component: AccountAuthorizedComponent;
  let fixture: ComponentFixture<AccountAuthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAuthorizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
