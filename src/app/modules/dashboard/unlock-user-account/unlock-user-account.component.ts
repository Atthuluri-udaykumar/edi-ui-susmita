import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unlock-user-account',
  templateUrl: './unlock-user-account.component.html',
  styleUrls: ['./unlock-user-account.component.css']
})
export class UnlockUserAccountComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onContinue(){
     this.router.navigate([`dashboard`]);

  }


}
