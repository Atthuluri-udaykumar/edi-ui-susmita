import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-idle-warning',
  templateUrl: './idle-warning.component.html',
  styleUrls: ['./idle-warning.component.css']
})
export class IdleWarningComponent implements OnInit {

  @Input() idleVisible = false;
  @Output() logOutPressed = new EventEmitter<boolean>();
  @Output() extendPressed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  logOut() {
    if (this.idleVisible) {
      this.logOutPressed.emit(true);
    }
  }

  stayLoggedIn() {
    this.extendPressed.emit(true);
  }

}
