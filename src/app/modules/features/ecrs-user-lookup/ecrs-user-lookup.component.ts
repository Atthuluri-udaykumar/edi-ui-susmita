import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng-lts/api';

@Component({
  selector: 'app-ecrs-user-lookup',
  templateUrl: './ecrs-user-lookup.component.html',
  styleUrls: ['./ecrs-user-lookup.component.css']
})
export class EcrsUserLookupComponent implements OnInit {

  userId: string = null;
  userFound: boolean = false;
  contractorId: any = null;

  contractors: any[] = [];
  selectedContractors: any[] = [];

  showAddUser: boolean = false;
  showConfirmation: boolean = false;
  showSuccess: boolean = false;

  constructor(private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  lookupUserById() {
    console.log('searching for user: ', this.userId);
    this.userFound = true;
    let mockData = [
      {contractorId: 'TestUser1'},
      {contractorId: 'TestUser2'},
      {contractorId: 'TestUser3'},
      {contractorId: 'TestUser4'},
    ];
    this.contractors = mockData;
  }

  onAddNew() {
    this.contractors.push({contractorId: this.contractorId})
    this.showAddUser = false;
  }

  revoke(user) {
    console.log('revoking user:', user)
    this.selectedContractors = [user];
    this.showConfirm();
  }

  revokeSelected() {
    console.log('revoking selected users:', this.selectedContractors)
    this.showConfirm();
  }

  showConfirm() {
    this.confirmationService.confirm({
      message: "Are you sure you want to revoke this user's file upload and download authority for the selected contractors?",
      accept: () => {
        this.contractors = this.contractors.filter(user => !this.selectedContractors.includes(user))
        this.selectedContractors = [];
        this.showSuccess = true;
      },
      reject: () => {
        this.selectedContractors = [];
      }
    })
  }

  close() {
    this.showSuccess = false;
    this.showAddUser = false;
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
