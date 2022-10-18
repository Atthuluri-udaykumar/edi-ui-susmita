import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from '../../../services/session.service';
import {ApiService} from '../../../services/api.service';
import {Person} from '../../../model/person.model';
import {AuthorizationService} from '../../../services/authorization.service';

@Component({
  selector: 'app-privilege-summary',
  templateUrl: './privilege-summary.component.html',
  styleUrls: ['./privilege-summary.component.css']
})
export class PrivilegeSummaryComponent implements OnInit {

  fullName: string = '';
  role: string = '';
  lastLogin: Date = null;
  @Input()
  applicationId: number;
  user: Person;

  rolePrivileges = [];
  applicationPrivileges = [];

  constructor(private session: SessionService, private apiService: ApiService,
              private permission: AuthorizationService) {
  }

  ngOnInit(): void {
    this.user = this.session.getCurrentUser();
    if (this.user) {
      this.fullName = this.user.firstName + ' ' + (this.user.middleName ? this.user.middleName : '') + ' ' + this.user.lastName;
      this.lastLogin = this.user.personSecurityDetail.lastLoginTimestamp;

      this.permission.initializePrivileges().subscribe(
        () => {
          this.role = this.permission.role;
          this.rolePrivileges = this.permission.rolePrivileges;
        }
      );
    }
  }

  refresh() {
    if (this.applicationId) {
      this.permission.initializePrivilegesByApplication(this.applicationId).subscribe(
        () => {
          this.applicationPrivileges = this.permission.applicationPrivileges;
        });
    }
  }
}
