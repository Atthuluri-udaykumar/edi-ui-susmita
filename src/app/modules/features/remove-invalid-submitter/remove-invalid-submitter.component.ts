import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-remove-invalid-submitter",
  templateUrl: "./remove-invalid-submitter.component.html",
  styleUrls: ["./remove-invalid-submitter.component.css"],
})
export class RemoveInvalidSubmitterComponent implements OnInit {
  constructor(private router: Router) {}

  showSuccessModal: boolean = false;
  ngOnInit() {}

  onCancel() {
    this.router.navigate(["accountInfo"]);
  }

  onRemove() {
    this.showSuccessModal = true;
  }

  toggleSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(["accountInfo"]);
  }
}
