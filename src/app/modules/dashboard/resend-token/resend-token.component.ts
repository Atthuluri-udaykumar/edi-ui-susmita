import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resend-token',
  templateUrl: './resend-token.component.html',
  styleUrls: ['./resend-token.component.css']
})
export class ResendTokenComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  onContinue(){
    this.router.navigate([`dashboard/resend-thankyou`]);
  }
  
  onCancel (){
   this.router.navigate([`dashboard`]);
  
 }

}
