import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetSubmitterComponent } from './vet-submitter.component';

describe('VetSubmitterComponent', () => {
  let component: VetSubmitterComponent;
  let fixture: ComponentFixture<VetSubmitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetSubmitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VetSubmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
