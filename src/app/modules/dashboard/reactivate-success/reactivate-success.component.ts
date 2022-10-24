import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactivate-success',
  templateUrl: './reactivate-success.component.html',
  styleUrls: ['./reactivate-success.component.css']
})
export class ReactivateSuccessComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onContinue(){
    this.router.navigate([`dashboard`]);
 }
}
