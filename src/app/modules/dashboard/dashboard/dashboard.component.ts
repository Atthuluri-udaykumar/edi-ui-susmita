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

  isContinue: Boolean = false

  ngOnInit(): void {
  }

  onContinue() {
    this.isContinue = true
  }

  onRedirect(routeName:String) {
    this.router.navigate([`dashboard/${routeName}`]);
  }
 
}
