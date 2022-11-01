import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isEDI: boolean = true;
  currentPassword: string = '';
  newPassword1: string = '';
  newPassword2: string = '';

  showReservedWords: boolean = false;
  reservedWords: string = 'Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit., Mauris, hendrerit, odio, eget, fringilla, varius, massa, justo, blandit, neque, id, ornare, diam, tellus, id, massa., Duis, sagittis, nisi, est, et, vulputate, sem, imperdiet, et., Nam, at, felis, tempor, imperdiet, nisl, venenatis, eleifend, erat., Vestibulum, eget, tincidunt, tortor., Praesent, vitae, rutrum, arcu, Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit., Mauris, hendrerit, odio, eget, fringilla, varius, massa, justo, blandit, neque, id, ornare, diam, tellus, id, massa., Duis, sagittis, nisi, est, et, vulputate, sem, imperdiet, et., Nam, at, felis, tempor, imperdiet, nisl, venenatis, eleifend, erat., Vestibulum, eget, tincidunt, tortor., Praesent, vitae, rutrum, arcu, Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit., Mauris, hendrerit, odio, eget, fringilla, varius, massa, justo, blandit, neque, id, ornare, diam, tellus, id, massa., Duis, sagittis, nisi, est, et, vulputate, sem, imperdiet, et., Nam, at, felis, tempor, imperdiet, nisl, venenatis, eleifend, erat., Vestibulum, eget, tincidunt, tortor., Praesent, vitae, rutrum, arcu';
  
  showSuccessModal: boolean = false;
  successMsg: string = "The user's password has been changed successfuly.  The user will receive an email containing their new password, which they will be required to use the next time they log into the COB Secure Website";
  ediSuccessMsg: string = 'Your password has been changed successfully.  You will be required to use the new password the next time you log into the COB Secure Website.';

  constructor(private routerService: RouterService, private router: Router) {
    this.routerService.passwordIsEDI$.subscribe(state => {
      this.isEDI = state;
    })
   }

  ngOnInit(): void { }

  toggleModal() {
    this.showReservedWords = !this.showReservedWords;
  }

  toggleSuccessModal() {
    if (this.showSuccessModal) {
      this.router.navigate(['dashboard']);
    } else {
      this.showSuccessModal = !this.showSuccessModal;
    }
  }

  disableSubmit() {
    if (this.isEDI) {
      return (!this.currentPassword || !this.newPassword1 || !this.newPassword2) ? true : false;
    } else {
      return (!this.newPassword1 || !this.newPassword2) ? true : false;
    }
  }

  submit() {
    this.showSuccessModal = true;
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }
}