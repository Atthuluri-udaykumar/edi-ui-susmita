import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-model',
  templateUrl: './dashboard-model.component.html',
  styleUrls: ['./dashboard-model.component.css']
})
export class DashboardModelComponent implements OnInit {


  @Input() infoMsg:String
  @Output() onCloseModel: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.infoMsg)
  }

  display: boolean = true;

  showDialog() {
      this.display = true;
  }


  onContinue(){
    this.display = false;
    this.onCloseModel.emit()
 }

}
