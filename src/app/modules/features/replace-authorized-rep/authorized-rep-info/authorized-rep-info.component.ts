import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { clone, cloneDeep } from "lodash"
import { Address } from "src/app/model/address.model";
import { Representative } from "src/app/model/representative.interface";
import { StateList } from "src/app/model/state-list.model";
import { ZipCode } from "src/app/model/zipcode.model";

@Component({
  selector: "app-authorized-rep-info",
  templateUrl: "./authorized-rep-info.component.html",
  styleUrls: ["./authorized-rep-info.component.css"],
})
export class AuthorizedRepInfoComponent implements OnInit {
  @Input() newAuthorizedRep: Representative;
  @Input() showNewAuthorizedRep: boolean;
  @Input() newArEmail: string;
  @Output() onContinue: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  authorizedRep: Representative;
  errorMsgs: Error[];

  zip10: string; //format in 99999-9999
  phoneExtn: string; //format in (999)999-9999 extn 9999
  stateList: StateList;
  constructor() {}

  ngOnInit() {
    this.stateList = new StateList();

    if(this.showNewAuthorizedRep){
      this.authorizedRep = {
        rreId: 0,
        firstName: '',
        lastName: '',
        jobTitle: '',
        phone: '',
        extn: '',
        fax: '',
        email: this.newArEmail,
        address: {
            streetLine1: '',
            streetLine2: '.',
            streetLine3: '',
            streetLine4: '',
            city: '',
            state: '',
            zipcode: {
              zip5: '',
              zip4: ''
            }
          }
      };
    } else {
      this.authorizedRep = cloneDeep(this.newAuthorizedRep);
      this.authorizedRep.email = this.newArEmail;

      this.zip10 = this.authorizedRep.address.zipcode.zip5 + this.authorizedRep.address.zipcode.zip4;
      this.phoneExtn = this.authorizedRep.phone + this.authorizedRep.extn;
    }
  }

  //called on continue button click
  continue(form) {
    console.log(form.firstName);
    console.log(form.streetLine1);
    console.log(this.phoneExtn + " form=" + form.phone);
    console.log(this.zip10  +  "form=" + form.zipcode);

    /*
     With extn: (101) 222-3456 x987 form=(101) 222-3456 x987
     No extn:   (123) 456-7890 form=(123) 456-7890
    */
    if(this.phoneExtn){
      if( this.phoneExtn.length > 10){
        let extnLoc:number = this.phoneExtn.indexOf("x");
        if( extnLoc > -1){
          this.authorizedRep.extn = this.phoneExtn.substring(extnLoc+1);
          this.authorizedRep.phone = this.phoneExtn.substring(0, extnLoc-1);
        }  else {
          this.authorizedRep.extn = this.phoneExtn.substring(10);
          this.authorizedRep.phone = this.phoneExtn.substring(0, 10);
        }
      } else {
        this.authorizedRep.extn = "";
        this.authorizedRep.phone = this.phoneExtn.substring(0, 15);
      }
      this.authorizedRep.phone = this.authorizedRep.phone
                                                  .replace(" ","")
                                                  .replace("-","")
                                                  .replace("(","")
                                                  .replace(")","");

    }

    /*
    With zip4:78728-1122 form=78728-1122
    No-Zip4:  21204- form=21204-
    */
    if(this.zip10){
      if( this.zip10.length > 5){
        this.authorizedRep.address.zipcode.zip4 = this.zip10.substring(5);
        this.authorizedRep.address.zipcode.zip5 = this.zip10.substring(0,5);
      } else {
        this.authorizedRep.address.zipcode.zip4 = "";
        this.authorizedRep.address.zipcode.zip5 = this.zip10.substring(0,5);
      }
      console.log("ZipCode=[" + this.authorizedRep.address.zipcode.zip5 + "] " + this.authorizedRep.address.zipcode.zip4);
    }

    /*
      Take user to before-after change confirm page after saving changes
    */
    this.onContinue.emit({newAuthorizedRep: this.authorizedRep});
  }

  cancel(){
    this.onCancel.emit({newAuthorizedRep: {rreId: 0}});
  }
}
