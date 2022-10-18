import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ephi',
  templateUrl: './ephi.component.html',
  styleUrls: ['./ephi.component.css']
})
export class EphiComponent implements OnInit {

  @Input() displayEphi = false;
  @Output() displayEphiChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() accepted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  accept() {
    this.accepted.emit(true);
  }

  cancel() {
    this.displayEphiChange.emit(false);
  }

}
