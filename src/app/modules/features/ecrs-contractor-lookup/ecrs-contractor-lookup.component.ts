import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService } from "primeng-lts/api";

@Component({
  selector: "app-ecrs-contractor-lookup",
  templateUrl: "./ecrs-contractor-lookup.component.html",
  styleUrls: ["./ecrs-contractor-lookup.component.css"],
})
export class EcrsContractorLookupComponent implements OnInit {
  contractorId: string = null;
  contractorFound: boolean = false;

  users: any[] = [];

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  lookupContractorById() {
    this.contractorFound = true;
    let mockData = [
      { userId: "TestUser1" },
      { userId: "TestUser2" },
      { userId: "TestUser3" },
      { userId: "TestUser4" },
    ];
    this.users = mockData;
  }

  cancel() {
    this.router.navigate(["/dashboard"]);
  }
}
