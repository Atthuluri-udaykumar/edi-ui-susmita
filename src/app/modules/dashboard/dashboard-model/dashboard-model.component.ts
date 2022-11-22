import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-model',
  templateUrl: './dashboard-model.component.html',
  styleUrls: ['./dashboard-model.component.css']
})
export class DashboardModelComponent implements OnInit {


  @Input() infoMsg:String
  @Output() onCloseModel: EventEmitter<any> = new EventEmitter<any>();

  selectedMessage: any;
  messageKey = [
    {
      infoMsg: 'id-proofing',
      header: 'Manual ID Proofing Confirmation',
      body: 'The individual associated to COBSW ID Proofing Reference Numbe has been successfully ID Proofed and their ID Proofing and MFA Status is set to ID Proofed.'
    },
    {
      infoMsg: 'restart-id-proofing',
      header: 'ID Proofing Restart Successful',
      body: "The user's account has been successfully unblocked."
    },
    {
      infoMsg: 'unlock-user-account',
      header: "Unlock User Account Successful",
      body: "The user's account has been successfully unlocked."
    },
    {
      infoMsg: 'confirm-reactivate',
      header: "Reactivate Successful",
      body: "Your request to Reactivate the Login id has been successfully processed."
    },
    {
      infoMsg: 'resend-token',
      header: "Thank You",
      body: "The new account manager will recieve an email notifying them that they have been invited to become a account manager for the selected Account ID. In order to gain access they muct follow the token URL provided within the invitation email and the complete the account manager setup process."
    }
  ]
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.infoMsg)
    this.selectedMessage = this.messageKey.find(x => this.infoMsg === x.infoMsg)
  }

  display: boolean = true;

  showDialog() {
      this.display = true;
  }


  onContinue(){
    this.display = false;
    this.onCloseModel.emit()
 }


}
