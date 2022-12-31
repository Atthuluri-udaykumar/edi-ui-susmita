/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { EcrsContractorLookupComponent } from "./ecrs-contractor-lookup.component";

describe("EcrsContractorLookupComponent", () => {
  let component: EcrsContractorLookupComponent;
  let fixture: ComponentFixture<EcrsContractorLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EcrsContractorLookupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcrsContractorLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
