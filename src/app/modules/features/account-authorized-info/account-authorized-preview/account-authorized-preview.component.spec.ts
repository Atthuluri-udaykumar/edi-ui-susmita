import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAuthorizedPreviewComponent } from './account-authorized-preview.component';

describe('AccountAuthorizedPreviewComponent', () => {
  let component: AccountAuthorizedPreviewComponent;
  let fixture: ComponentFixture<AccountAuthorizedPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAuthorizedPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAuthorizedPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
