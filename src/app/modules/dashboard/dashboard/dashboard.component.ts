import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
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

  onSetOpen(data: any) {
    this.infoMsg = data;
    this.isOpen = true;
  }

  onCloseModel() {
    this.isOpen = false;
  }

  onCancel(){
    this.loadPage=''
  }

}
