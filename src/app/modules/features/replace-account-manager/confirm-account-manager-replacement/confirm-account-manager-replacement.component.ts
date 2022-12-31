import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-confirm-account-manager-replacement",
  templateUrl: "./confirm-account-manager-replacement.component.html",
  styleUrls: ["./confirm-account-manager-replacement.component.css"],
})
export class ConfirmAccountManagerReplacementComponent implements OnInit {
  @Input() accountManager;
  @Input() newAccountManager;

  showSuccessModal: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onConfirm() {
    this.showSuccessModal = true;
  }

  toggleSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(["/dashboard"]);
  }
}
