import { Component, OnInit, Output, Input, Renderer2 } from "@angular/core";
import { BaseComponent } from 'src/app/base.component';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Person } from "src/app/model/person.model";
import { MomentDatePipe } from "src/app/pipes/moment-date.pipe";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { DropDownService } from "src/app/services/drop-down.service";
import { FormService } from "src/app/services/form.service";
import { EdiValidators } from "src/app/services/edi-validators";
import { ResponseService } from "src/app/services/response.service";
import { SessionService } from "src/app/services/session.service";
import { ErrorMessagesService } from "../../shared-modules/general/error-messages/error-messages.service";
import systemErrors from "src/app/services/system-errors";
import systemSuccesses from "src/app/services/system-successes";


@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends BaseComponent
    implements OnInit {
    errorMsgs: any[] = [];
    successMsgs: any[] = [];

    states: any[];

    sameAsPn: boolean = false;
    renderForm: boolean = false;
    viewOnly: boolean = true;

    oldPerson: Person;

    personalInfoForm: FormGroup;

    // User Information
    firstName: FormControl;
    middleInitial: FormControl;
    lastName: FormControl;
    dob: FormControl;
    ssn: FormControl;
    companyName: FormControl;
    jobTitle: FormControl;
    phoneNumber: FormControl;
    extension: FormControl;
    emailId: FormControl;
    reEmailId: FormControl;

    // Mailing Address
    streetLine1: FormControl;
    streetLine2: FormControl;
    city: FormControl;
    state: FormControl;
    zipCode: FormControl;
    isLoading = false;

    constructor(public dropDownService: DropDownService,
        public renderer2: Renderer2,
        public apiService: ApiService,
        private router: Router,
        public formService: FormService,
        private sessionService: SessionService,
        private errorMessagesService: ErrorMessagesService,
        private responseService: ResponseService) {
        super();
    }


    ngOnInit() {
        this.renderForm = false;

        const sessionUser = this.sessionService.current_user.getValue();
    }


    initForm(person: Person) {
        if (this.personalInfoForm) {
            this.personalInfoForm.reset();
        }

        // User Information
        this.firstName = new FormControl({
            value: person.firstName,
            disabled: this.viewOnly
        },
            [Validators.required, EdiValidators.xss()]);

        this.middleInitial = new FormControl({
            value: person.middleName,
            disabled: this.viewOnly
        });

        this.lastName = new FormControl({
            value: person.lastName,
            disabled: this.viewOnly
        },
            [Validators.required, EdiValidators.xss()]);

        // Date Of Birth (dob)
        let dateOfBirth = '';
        if (person.dateOfBirth) {
            const momentDatePipe: MomentDatePipe = new MomentDatePipe('en-US');
            let bod = new Date(person.dateOfBirth);
            dateOfBirth = momentDatePipe.transform(bod,
                'M/d/yyyy');
        }

        this.dob = new FormControl({
            value: dateOfBirth,
            disabled: true
        });

        this.ssn = new FormControl({
            value: '999-99-9999',
            disabled: true
        });

        this.companyName = new FormControl({
            value: person.companyName,
            disabled: this.viewOnly
        },
            EdiValidators.xss());

        this.jobTitle = new FormControl({
            value: person.jobTitle,
            disabled: this.viewOnly
        },
            [Validators.required, EdiValidators.xss()]);

        this.phoneNumber = new FormControl({
            value: person.phoneNumber,
            disabled: this.viewOnly
        },
            Validators.required);

        this.extension = new FormControl({
            value: person.extension,
            disabled: this.viewOnly
        },
            EdiValidators.greaterThan(1, systemErrors['error.extension.invalid']));

        this.emailId = new FormControl({
            value: person.emailAddress,
            disabled: this.viewOnly
        },
            [Validators.required, EdiValidators.xss(), EdiValidators.email()]);

        this.reEmailId = new FormControl({
            value: '',
            disabled: this.viewOnly
        },
            [Validators.required, EdiValidators.xss(), EdiValidators.equalTo('emailId', systemErrors['error.generic.question.equal'])]);

        // Mailing Address
        this.streetLine1 = new FormControl({
            value: person.streetLine1,
            disabled: this.viewOnly
        },
            [Validators.required, EdiValidators.xss()]);

        this.streetLine2 = new FormControl({
            value: person.streetLine2,
            disabled: this.viewOnly
        },
            EdiValidators.xss());

        this.city = new FormControl({
            value: person.city,
            disabled: this.viewOnly
        },
            [Validators.required, EdiValidators.xss()]);

        this.state = new FormControl({
            value: person.state,
            disabled: this.viewOnly
        },
            Validators.required);

        this.zipCode = new FormControl({
            value: person.zipCode,
            disabled: this.viewOnly
        },
            {
                validators: [Validators.required, EdiValidators.zipCode()],
                updateOn: 'blur'
            });

        this.personalInfoForm = new FormGroup({ // User Information
            'firstName': this.firstName,
            'middleInitial': this.middleInitial,
            'lastName': this.lastName,
            'dob': this.dob,
            'ssn': this.ssn,
            'companyName': this.companyName,
            'jobTitle': this.jobTitle,
            'phoneNumber': this.phoneNumber,
            'extension': this.extension,
            'emailId': this.emailId,
            'reEmailId': this.reEmailId,
            // Mailing Address
            'streetLine1': this.streetLine1,
            'streetLine2': this.streetLine2,
            'city': this.city,
            'state': this.state,
            'zipCode': this.zipCode
        });
    }


    onFormSubmit() {
        // Clean messages
        this.errorMsgs = [];
        this.successMsgs = [];

        // Trigger validations in all Form controls
        this.formService.touchControls(this.personalInfoForm);
    }


    convertUserProfileInputToPerson(personalInfoForm: FormGroup) {
        // Get the Current User 
        //    - The Role is used to determine Personal Information Change Email transaction
        //    - The UserName is used to record who made this Update
        const currentUser: Person = this.sessionService.current_user.value;

        const person: Person = new Person();
        person.personId = this.oldPerson.personId;
        person.firstName = personalInfoForm.get('firstName').value;
        person.middleName = personalInfoForm.get('middleInitial').value;
        person.lastName = personalInfoForm.get('lastName').value;
        person.dateOfBirth = this.oldPerson.dateOfBirth;
        person.ssn = this.oldPerson.ssn;
        person.jobTitle = personalInfoForm.get('jobTitle').value;
        person.phoneNumber = personalInfoForm.get('phoneNumber').value;
        person.faxNumber = this.oldPerson.faxNumber;
        person.extension = personalInfoForm.get('extension').value;
        person.emailAddress = personalInfoForm.get('emailId').value;
        person.streetLine1 = personalInfoForm.get('streetLine1').value;
        person.streetLine2 = personalInfoForm.get('streetLine2').value;
        person.city = personalInfoForm.get('city').value;
        person.state = personalInfoForm.get('state').value;
        person.zipCode = personalInfoForm.get('zipCode').value;
        person.role = currentUser.role;

        person.companyName = personalInfoForm.get('companyName').value;
        person.userName = currentUser.userName;

        // Hijack / Set Email Security Id 
        if (person.firstName != this.oldPerson.firstName ||
            person.lastName != this.oldPerson.lastName ||
            person.emailAddress != this.oldPerson.emailAddress) {
            // Create / Send Personal Information Change Email transaction
            person.emailSecurityId = '1';
        }
        else {
            // DON'T Create / Send Personal Information CHange Email transaction
            person.emailSecurityId = '0';
        }

        return person;
    }


    updateSessionCurrentUserWithUpdatedInformation(person: Person) {
        const sessionUser = this.sessionService.current_user.getValue();

        sessionUser.firstName = person.firstName;
        sessionUser.lastName = person.lastName;
        sessionUser.middleName = person.middleName;
        sessionUser.jobTitle = person.jobTitle;
        sessionUser.phoneNumber = person.phoneNumber;
        sessionUser.extension = person.extension;
        sessionUser.emailAddress = person.emailAddress;
        sessionUser.streetLine1 = person.streetLine1;
        sessionUser.streetLine2 = person.streetLine2;
        sessionUser.city = person.city;
        sessionUser.state = person.state;
        sessionUser.zipCode = person.zipCode;
        sessionUser.companyName = person.companyName;

        this.sessionService.current_user.next(sessionUser);

        this.oldPerson = sessionUser;
    }


    onCancel() {
        this.router.navigate(['dashboard']);
    }
}
