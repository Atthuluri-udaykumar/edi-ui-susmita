import {Component, OnInit} from '@angular/core';
import {environment} from './../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  privacyPolicy = '';
  userAgreement = '';
  accessibility = '';

  constructor() {
  }

  ngOnInit() {
    this.privacyPolicy = environment.url + '/help/!SSL!/WebHelp/PWS/Privacy_Policy.htm';
    this.userAgreement = environment.url + '/help/!SSL!/WebHelp/PWS/userAgreement.htm';
    this.accessibility = environment.url + '/help/!SSL!/WebHelp/PWS/Accessibility.htm';
  }

}
