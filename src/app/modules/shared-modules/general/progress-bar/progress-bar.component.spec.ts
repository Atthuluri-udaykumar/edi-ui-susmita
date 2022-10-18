import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ProgressBarComponent, WizardState} from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    component.states = [new WizardState()];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set current state if state parameter is not disabled', () => {
    let state = new WizardState();
    state.isDisabled = false;
    component.setCurrent(state);
    expect(state.isCurrent).toBeTruthy();
  });

  it('should not set current state if state parameter is disabled', () => {
    let state = new WizardState();
    component.setCurrent(state);
    expect(state.isCurrent).toBeFalsy();
  });

  it('should remove styles', () => {
    window.scrollTo(0, 90);
    component.floatFunction();
    expect(component.element.nativeElement.attributes.top).toBeFalsy();
  });
});
