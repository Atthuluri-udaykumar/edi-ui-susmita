import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantFullFunctionComponent } from './grant-full-function.component';

describe('GrantFullFunctionComponent', () => {
  let component: GrantFullFunctionComponent;
  let fixture: ComponentFixture<GrantFullFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantFullFunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantFullFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
