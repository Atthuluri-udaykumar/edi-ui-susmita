import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactivate-successful',
  templateUrl: './reactivate-successful.component.html',
  styleUrls: ['./reactivate-successful.component.css']
})
export class ReactivateSuccessfulComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onContinue(){
    this.router.navigate(['dashboard']);
  }

  
}
