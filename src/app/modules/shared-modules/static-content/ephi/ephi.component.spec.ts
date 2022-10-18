import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EphiComponent} from './ephi.component';
import {DialogModule} from 'primeng-lts/dialog';

describe('EphiComponent', () => {
  let component: EphiComponent;
  let fixture: ComponentFixture<EphiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EphiComponent],
      imports: [DialogModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EphiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
