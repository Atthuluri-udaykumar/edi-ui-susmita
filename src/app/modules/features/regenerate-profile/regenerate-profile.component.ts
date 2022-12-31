import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { ConfirmationService } from 'primeng-lts/api';

import { Employer } from 'src/app/model/employer.model';

@Component({
  selector: 'app-regenerate-profile',
  templateUrl: './regenerate-profile.component.html',
  styleUrls: ['./regenerate-profile.component.css']
})
export class RegenerateProfileComponent implements OnInit {
  accountId: string = null;
  ein: string = null;
  emp_ein: string = '';
	emp_pin: string = '';
  emp_einLockStatus: string = '';
  emp_submitterStatus: string = '';
  employer: Employer = new Employer();

  showSuccess: boolean = false;

  constructor(private routerService: RouterService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.accountId = '12345';
    this.ein = '000012345';
    this.emp_ein = '122333445';
    this.emp_pin = '1234';
    this.emp_einLockStatus = 'unlocked';
    this.emp_submitterStatus = 'Active';
    this.employer = {
        ein: '000012345',
        name: 'Emp Account',
        phoneNumber: '123-456-7890',
        email: 'MSPRP_REP_0822@test-team.cobqa.com',
        address: {
          streetLine1: 'One West Pennsylvania Ave',
          streetLine2: '',
          streetLine3: '',
          streetLine4: '',
          city: 'Towson',
          state: 'MD',
          zipcode: {
            zip5: '21204',
            zip4: ''
          }
        }
      };
  };

  onResend() {
    this.showSuccess = true;
  }

  onClose() {
    this.showSuccess = false;
  }

  onContinue() {
    this.routerService.navigateTo('accountInfo', false);
  }

  onCancel() {
    this.routerService.navigateTo('accountInfo', false);
  }
}
