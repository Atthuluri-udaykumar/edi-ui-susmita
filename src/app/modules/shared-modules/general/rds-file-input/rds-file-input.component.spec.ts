import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RdsFileInputComponent } from './rds-file-input.component';

describe('RdsFileInputComponent', () => {
  let component: RdsFileInputComponent;
  let fixture: ComponentFixture<RdsFileInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsFileInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
