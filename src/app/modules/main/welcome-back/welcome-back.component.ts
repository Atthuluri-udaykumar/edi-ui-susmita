import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Person} from '../../../model/person.model';
import {SessionService} from '../../../services/session.service';
import {PersonSecurityDetail} from '../../../model/personSecurityDetail.model';

@Component({
  selector: 'app-welcome-back',
  templateUrl: './welcome-back.component.html',
  styleUrls: ['./welcome-back.component.css']
})
export class WelcomeBackComponent implements OnInit {

  user: Person;
  firstTime = false;
  failedAttempts = false;
  multipleAttempts = false;

  securityDetails: PersonSecurityDetail;

  loginAttempts: number = 0;

  constructor(private router: Router, private session: SessionService) {
  }

  ngOnInit() {
    this.user = this.session.getCurrentUser();
    this.securityDetails = this.user.personSecurityDetail;

    if (this.securityDetails.lastLoginTimestamp) {
      this.firstTime = false;
    } else {
      this.firstTime = true;
    }

    this.loginAttempts = this.securityDetails.passwordChangeCount;
    this.failedAttempts = this.loginAttempts > 0;
    this.multipleAttempts = this.loginAttempts > 1;
  }

  continueToPsList() {
    this.router.navigate(['/home']);
  }

}
