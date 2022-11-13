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


  ngOnInit(): void {
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
