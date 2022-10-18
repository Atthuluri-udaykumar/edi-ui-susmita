import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {SessionService} from './session.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  role: string = '';
  rolePrivileges = [];
  
  permissions: any;

  constructor(private apiService: ApiService, private session: SessionService) {
  }

  getPermission(page: string): string {
    let pagePermissions;
    if (pagePermissions = this.permissions[page]) {
      if (this.checkPermission(pagePermissions.readWrite)) {
        return 'readWrite';
      } else if (this.checkPermission(pagePermissions.readOnly)) {
        return 'readOnly';
      }
    }
    return '';
  }

  private checkPermission(permission: any) {
    return true;
  }

  // This method is called once and a list of permissions is stored in the permissions property
  initializePrivileges() {
    return this.apiService.getSession(this.session.getCurrentUser().personId.toString()).pipe(
      map((response) => {
        this.role = response.result.personRoleName;
        this.rolePrivileges = response.result.rolePrivileges;
        return response;
      }));
  }

  initializePermissionsMap(pagePermitMap: any) {
    if (this.permissions) {
      this.permissions = {...this.permissions, ...pagePermitMap};
    } else {
      this.permissions = pagePermitMap;
    }
  }

  checkIfUserPrivileges(privileges: any[], privilege: string): boolean {
    if (privileges && privileges.length >= 0) {
      for (let priv of privileges) {
        if (priv.prvlgTxt === privilege) {
          return true;
        }
      }
    }
    return false;
  }
}
