import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resend-thankyou',
  templateUrl: './resend-thankyou.component.html',
  styleUrls: ['./resend-thankyou.component.css']
})
export class ResendThankyouComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onContinue(){
     this.router.navigate([`dashboard`]);
  }


}
