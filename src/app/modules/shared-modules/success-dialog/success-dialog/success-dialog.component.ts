import {Component, Inject, Input, OnInit} from '@angular/core';
import {Constants} from '../../../../services/constants';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {environment} from './../../../../../environments/environment';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  environmentUrl = environment.url;

  @Input() showEmailSuccess: boolean;

  @Input() emailTypeFlow: string = '';

  style: string;

  headerTitle: string = 'Email Success';

  constructor(public constants: Constants, private router: Router, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    if (this.emailTypeFlow === this.constants.VERIFY_EMAIL_PIN || this.emailTypeFlow === this.constants.DISABLED_ACCOUNT_WITH_TOKEN) {
      this.style = 'small-dialog';
      this.headerTitle = 'Success'
    }
  }

  exit(): void {
    this.router.navigate(['/login']);
  }

}
