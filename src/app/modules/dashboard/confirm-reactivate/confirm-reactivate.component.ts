import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirm-reactivate',
  templateUrl: './confirm-reactivate.component.html',
  styleUrls: ['./confirm-reactivate.component.css']
})
export class ConfirmReactivateComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onYes(){
    this.router.navigate([`dashboard/reactivate-successful`]);
 }

  onCancel(){
    this.router.navigate(['dashboard']);
  }

}
