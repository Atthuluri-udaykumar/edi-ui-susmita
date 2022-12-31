import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-replace-account-manager",
  templateUrl: "./replace-account-manager.component.html",
  styleUrls: ["./replace-account-manager.component.css"],
})
export class ReplaceAccountManagerComponent implements OnInit {
  selectedValue: string = "WCS";
  email: string = null;
  accountId: string = null;

  accountManager = null;
  newAccountManager = null;

  showInfo: boolean = false;
  showNewAccountManager: boolean = false;
  showReplacement: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  isSearchDisabled() {
    if (this.selectedValue === "CRCP" && !this.accountId) {
      return true;
    } else if (
      this.selectedValue !== "CRCP" &&
      !this.accountId &&
      !this.email
    ) {
      return true;
    } else {
      return false;
    }
  }

  resetSearchForm() {
    this.email = null;
    this.accountId = null;
    this.accountManager = null;
    this.showInfo = false;
    this.showReplacement = false;
    this.showNewAccountManager = false;
  }

  onSearch() {
    this.resetSearchForm();
    this.accountManager = {
      firstName: "John",
      lastName: "Smith",
      email: this.email || "john.smith@email.com",
      status: "Active",
    };
    this.showInfo = true;
  }

  newAccountManagerLookup(event) {
    this.showInfo = false;
    if (event) {
      this.newAccountManager = {
        firstName: "Tom",
        lastName: "Cruise",
        email: event,
        status: "Active",
      };
      this.openConfirmReplacement(this.newAccountManager);
    } else {
      this.newAccountManager = {
        firstName: "",
        lastName: "",
        email: "test@test.com",
        status: "Pending",
      };
      this.showNewAccountManager = true;
    }
  }

  openConfirmReplacement(event) {
    this.newAccountManager = event;
    this.showNewAccountManager = false;
    this.showReplacement = true;
  }
}
