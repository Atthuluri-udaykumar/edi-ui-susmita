import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouterService } from "src/app/services/router.service";

@Component({
  selector: "app-account-info",
  templateUrl: "./account-info.component.html",
  styleUrls: ["./account-info.component.css"],
})
export class AccountInfoComponent implements OnInit {
  constructor(private routerService: RouterService, private router: Router) {}
  submittersData: any[] = [];
  accountId: number;

  public selectedOption: String;

  ngOnInit(): void {
    this.accountId = 29323;
    this.submittersData = [
      {
        firstName: "Jack",
        MI: "P",
        lastName: "Test",
        email: "jack@gmail.com",
        phone: "865895498",
        ext: "64872",
      },
    ];
  }

  onCancel() {
    this.routerService.navigateTo("submittersRequiring", false);
  }
  onSelectChange(event: any) {}

  onUnlockPin() {
    this.routerService.navigateTo("unlockPin", false);
  }

  onRegenProfile() {
    this.router.navigate(["regenProfile", this.accountId]);
  }

  onAccountActivity() {
    this.router.navigate(["accountActivity", this.accountId]);
  }

  onResetPin() {
    this.router.navigate(["resetPin", this.accountId]);
  }

  onGrantFullFunction() {
    this.router.navigate(["grantFullFunction", this.accountId]);
  }

  onRemoveInvalid() {
    this.router.navigate(["removeInvalid", this.accountId]);
  }

  onPaperlessEmails() {
    this.router.navigate(["paperlessEmails", this.accountId]);
  }

  onPaperlessParties() {
      this.router.navigate(["paperlessParties", this.accountId]);
  }

  onGo(route: String) {
    this.routerService.navigateTo(route, false);
  }
}
