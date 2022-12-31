import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-new-account-manager",
  templateUrl: "./new-account-manager.component.html",
  styleUrls: ["./new-account-manager.component.css"],
})
export class NewAccountManagerComponent implements OnInit {
  @Input() newAccountManager: any;
  @Output() onContinue: EventEmitter<any> = new EventEmitter<any>();

  password1: string = null;
  password2: string = null;

  constructor() {}

  ngOnInit() {}

  continue() {
    this.saveNewAccountManager({
      ...this.newAccountManager,
      password1: this.password1,
      password2: this.password2,
    });
    this.onContinue.emit(this.newAccountManager);
  }

  saveNewAccountManager(acctManager) {}
}
