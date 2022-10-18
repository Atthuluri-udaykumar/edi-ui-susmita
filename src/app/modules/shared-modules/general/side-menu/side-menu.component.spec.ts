import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SideMenuComponent} from './side-menu.component';
import {PanelMenuModule} from 'primeng-lts/panelmenu';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PanelMenuModule],
      declarations: [SideMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
