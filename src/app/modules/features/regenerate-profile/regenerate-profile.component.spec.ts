import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegenerateProfileComponent } from './regenerate-profile.component';

describe('RegenerateProfileComponent', () => {
  let component: RegenerateProfileComponent;
  let fixture: ComponentFixture<RegenerateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegenerateProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegenerateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
