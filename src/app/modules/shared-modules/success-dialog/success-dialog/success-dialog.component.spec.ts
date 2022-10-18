import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SuccessDialogComponent} from './success-dialog.component';
import {DialogModule} from 'primeng-lts/dialog';
import {Constants} from '../../../../services/constants';
import {RouterTestingModule} from '@angular/router/testing';

describe('SuccessDialogComponent', () => {
  let component: SuccessDialogComponent;
  let fixture: ComponentFixture<SuccessDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessDialogComponent],
      imports: [DialogModule, RouterTestingModule],
      providers: [Constants]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should change style if flow is for verify email', () => {
  //   component.emailTypeFlow = '6';
  //   component.ngOnInit();
  //   expect(component.style === 'small-dialog').toBeTruthy();
  // });

  // it('should navigate to login page if user closes the dialog', () => {
  //   let navigateSpy = spyOn((<any>component).router, 'navigate');
  //   component.exit();
  //   expect(navigateSpy).toHaveBeenCalledWith(['login']);
  // });


});
