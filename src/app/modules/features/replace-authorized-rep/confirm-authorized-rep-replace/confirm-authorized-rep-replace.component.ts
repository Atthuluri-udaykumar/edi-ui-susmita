import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Representative } from "src/app/model/representative.interface";

@Component({
  selector: "app-confirm-authorized-rep-replace",
  templateUrl: "./confirm-authorized-rep-replace.component.html",
  styleUrls: ["./confirm-authorized-rep-replace.component.css"],
})
export class ConfirmAuthorizedRepReplaceComponent implements OnInit {
  @Input() authorizedRep: Representative;
  @Input() newAuthorizedRep: Representative;
  @Input() rreList: Representative[];
  @Input() newRreList: Representative;
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  showSuccessModal: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onConfirm() {
    this.showSuccessModal = true;
  }

  cancel(){
    this.onCancel.emit({newAuthorizedRep: this.newAuthorizedRep});
  }

  toggleSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(["accountAuthorized"]);
  }

}
