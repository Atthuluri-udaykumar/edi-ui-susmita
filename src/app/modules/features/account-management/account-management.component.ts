import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {

  constructor(
    private routerService: RouterService
  ) { }
  city:any;

  ngOnInit(): void {
  }

  onCancel() {
    this.routerService.navigateTo('dashboard', false);
  }

  onContinue(){
    this.routerService.navigateTo('accountInfo', false);
  }
}
