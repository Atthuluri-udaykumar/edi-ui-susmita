import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperlessPartiesComponent } from './paperless-parties.component';

describe('PaperlessPartiesComponent', () => {
  let component: PaperlessPartiesComponent;
  let fixture: ComponentFixture<PaperlessPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaperlessPartiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperlessPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
