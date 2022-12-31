import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-account-manager-info",
  templateUrl: "./account-manager-info.component.html",
  styleUrls: ["./account-manager-info.component.css"],
})
export class AccountManagerInfoComponent implements OnInit {
  @Input() accountManager;
  @Output() onContinue: EventEmitter<any> = new EventEmitter<any>();

  newEmail: string = null;

  constructor() {}

  ngOnInit() {}

  continue() {
    this.onContinue.emit(this.newEmail);
  }
}
