import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropDownService } from '../../../../../services/drop-down.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanSponsor } from '../../../../../model/plansponsor.model';
import { FormService } from '../../../../../services/form.service';
import { EdiValidators } from '../../../../../services/edi-validators';

@Component({
  selector: 'app-info-form-ps',
  templateUrl: './info-form-plan-sponsor.component.html',
  styleUrls: ['./info-form-plan-sponsor.component.css']
})
export class InfoFormPlanSponsorComponent implements OnInit {

  errorMsgs = [];
  planSponsorForm: FormGroup;
  @Input() planSponsorData: PlanSponsor = new PlanSponsor();
  @Input() page: string = '';
  @Input() psViewable: boolean = false;
  @Input() psAuthRep: boolean = false;
  @Input() psUpdatable: boolean = false;

  @Output() pressCancel = new EventEmitter<boolean>();
  @Output() pressSubmit = new EventEmitter<{ plan: PlanSponsor, errors: any[] }>();

  cancelButton = 'Cancel';
  continueButton = 'Continue';

  employerIdNumber: FormControl;
  companyName: FormControl;
  phoneNumber: FormControl;
  organizationType: FormControl;
  streetLine1: FormControl;
  city: FormControl;
  state: FormControl;
  zipCode: FormControl;

  states = [];
  organizationTypes =[];

  constructor(public dropDownService: DropDownService, private formService: FormService) {
  }

  ngOnInit() {

    if (this.psAuthRep) {
      this.cancelButton = 'Return';
    } else {
      this.cancelButton = 'Cancel';
    }

    if (this.page === 'verify') {
      this.continueButton = 'Confirm';
    }

    this.psUpdatable = this.page !== 'register';

    this.employerIdNumber = new FormControl({
      value: this.planSponsorData.employerIdNumber, disabled: this.psUpdatable
    }, Validators.required);

    this.companyName = new FormControl({
      value: this.planSponsorData.companyName, disabled: this.psUpdatable
    }, Validators.required);

    this.phoneNumber = new FormControl({ value: this.planSponsorData.phoneNumber, disabled: this.psViewable }, Validators.required);

    this.organizationType = new FormControl({
      value: this.planSponsorData.organizationType ? this.planSponsorData.organizationType : '', disabled: this.psViewable
    }, Validators.required);

    this.streetLine1 = new FormControl({ value: this.planSponsorData.streetLine1, disabled: this.psViewable }, Validators.required);

    this.city = new FormControl({ value: this.planSponsorData.city, disabled: this.psViewable }, Validators.required);

    this.state = new FormControl({
      value: this.planSponsorData.state ? this.planSponsorData.state : '', disabled: this.psViewable
    }, Validators.required);

    this.zipCode = new FormControl({ value: this.planSponsorData.zipCode, disabled: this.psViewable },
      { validators: [Validators.required, EdiValidators.zipCode()], updateOn: 'blur' });

    this.planSponsorForm = new FormGroup({
      'employerIdNumber': this.employerIdNumber,
      'companyName': this.companyName,
      'phoneNumber': this.phoneNumber,
      'extension': new FormControl({ value: this.planSponsorData.extension, disabled: this.psViewable }),
      'faxNumber': new FormControl({ value: this.planSponsorData.faxNumber, disabled: this.psViewable }),
      'webAddress': new FormControl({
        value: this.planSponsorData.webAddress ? this.planSponsorData.webAddress : 'http://',
        disabled: this.psViewable
      }),
      'organizationType': this.organizationType,
      'streetLine1': this.streetLine1,
      'streetLine2': new FormControl({ value: this.planSponsorData.streetLine2, disabled: this.psViewable }),
      'city': this.city,
      'state': this.state,
      'zipCode': this.zipCode,
      'compositeReportsAllowed': new FormControl(this.planSponsorData.vendorCompositeReportExclusionFlag + '')
    });

    this.dropDownService.getStateTypeCodes().subscribe( value => this.states = value);
    this.dropDownService.organizationTypeCodes().subscribe( value => this.organizationTypes = value);
  }

  onSubmit() {
    this.errorMsgs = [];

    this.formService.touchControls(this.planSponsorForm);

    let errorList = this.formService.validateControlsAndGetList(this.planSponsorForm, 'infoPlanSponsor');

    this.pressSubmit.emit({ plan: this.planSponsorForm.value, errors: errorList });
  }

  back() {
    this.pressCancel.emit(true);
  }

}


