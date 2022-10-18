import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {FooterComponent} from './footer.component';
import {RouterTestingModule} from '@angular/router/testing';
import {GeneralModule} from '../../shared-modules/general/general.module';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [RouterTestingModule, GeneralModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
