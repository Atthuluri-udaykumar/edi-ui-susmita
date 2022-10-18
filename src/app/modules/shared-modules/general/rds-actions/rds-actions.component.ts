import {Component, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-rds-actions',
  templateUrl: './rds-actions.component.html',
  styleUrls: ['./rds-actions.component.css']
})
export class RdsActionsComponent implements OnInit {

  @Input() records: any[];
  selectedAction = '';
  @Input() describedBy: String;
  @Input() actionId: string;

  @Output() optionSelected = new EventEmitter<any>();

  constructor() {
  }

  onGo() {
    this.optionSelected.emit(this.selectedAction);
  }

  ngOnInit(): void {
  }

}
