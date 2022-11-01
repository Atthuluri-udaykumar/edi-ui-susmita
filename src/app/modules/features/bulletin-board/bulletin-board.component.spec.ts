import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {DialogModule} from 'primeng-lts/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import { BulletinBoardComponent } from './bulletin-board.component';

describe('BulletinBoardComponent', () => {
  let component: BulletinBoardComponent;
  let fixture: ComponentFixture<BulletinBoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BulletinBoardComponent],
      imports: [DialogModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
