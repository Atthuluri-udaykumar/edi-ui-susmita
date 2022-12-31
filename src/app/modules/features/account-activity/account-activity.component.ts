import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-account-activity",
  templateUrl: "./account-activity.component.html",
  styleUrls: ["./account-activity.component.css"],
})
export class AccountActivityComponent implements OnInit {
  activity = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.activity = [
      {
        activityDate: "05/01/2021",
        description: "Requested an open debt report",
        userId: "ABC123",
      },
      {
        activityDate: "04/01/2021",
        description: "Provide Notice of Settlement",
        userId: "ABC123",
      },
      {
        activityDate: "03/01/2021",
        description: "Case SUbmitted",
        userId: "ABC123",
      },
      {
        activityDate: "02/01/2021",
        description: "Account Setup",
        userId: "ABC123",
      },
      {
        activityDate: "01/01/2021",
        description: "Submitter Registration",
        userId: "ABC123",
      },
    ];
  }

  onContinue() {
    this.router.navigate(["accountInfo"]);
  }
}
