import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { take } from 'rxjs/operators';

import { Employer } from 'src/app/model/employer.model';

@Component({
  selector: 'app-grant-full-function',
  templateUrl: './grant-full-function.component.html',
  styleUrls: ['./grant-full-function.component.css']
})
export class GrantFullFunctionComponent implements OnInit {
  accountId: string = null;
  ein: string = null;
  emp_ein: string = '';
	emp_pin: string = '';
  emp_einLockStatus: string = '';
  emp_submitterStatus: string = '';
  employer: Employer = new Employer();

  showSuccess: boolean = false;

  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.accountId = params.get('id');
    });
    this.ein = '000012345';
    this.emp_ein = '122333445';
    this.emp_pin = '1234';
    this.emp_einLockStatus = 'unlocked';
    this.emp_submitterStatus = 'PIN Sent';
    this.employer = {
        ein: '000012345',
        name: 'Rep Account',
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
  }

  onCancel() {
    this.showSuccess = false;
    this.routerService.navigateTo('accountInfo', false);
  }

  grantFunctionality() {
    this.showSuccess = true;
  }
  onContinue() {
    this.showSuccess = false;
    this.routerService.navigateTo('accountInfo', false);
  }
}
