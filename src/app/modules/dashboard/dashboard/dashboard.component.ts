import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private routerService: RouterService
  ) { }

  isContinue: Boolean = false;

  isOpen: Boolean = false;
  infoMsg: String = '';

  loadPage: String = '';

  userAccounts = [];

  ngOnInit(): void {
    this.userAccounts = [
      {application: 'Section 111', role: 'Admin', accountNumber: '12345ABC', accountName: 'Test Account 1', accountStatus: 'Active'},
      {application: 'MSPRC', role: 'User', accountNumber: '12345ABC', accountName: 'Test Account 2', accountStatus: 'Inactive'},
      {application: 'Section 111', role: 'User', accountNumber: '12345ABC', accountName: 'Test Account 3', accountStatus: 'Active'},
      {application: 'Section 111', role: 'Admin', accountNumber: '12345ABC', accountName: 'Test Account 4', accountStatus: 'Active'},
      {application: 'Section 111', role: 'User', accountNumber: '12345ABC', accountName: 'Test Account 5', accountStatus: 'Inactive'},
      {application: 'MSPRC', role: 'User', accountNumber: '12345ABC', accountName: 'Test Account 6', accountStatus: 'Active'},
      {application: 'MSPRC', role: 'Admin', accountNumber: '12345ABC', accountName: 'Test Account 7', accountStatus: 'Active'}
    ]
  }

  onContinue() {
    this.isContinue = true
  }

  onRedirect(routeName: String) {
    this.loadPage = routeName;
  }

  onResetPassword() {
    this.routerService.navigateTo('resetPassword', false);
  }

  onSetOpen(data: any) {
    this.infoMsg = data;
    this.isOpen = true;
  }

  onCloseModel() {
    this.isOpen = false;
    this.onCancel()
  }

  onCancel(){
    this.loadPage=''
  }

}
