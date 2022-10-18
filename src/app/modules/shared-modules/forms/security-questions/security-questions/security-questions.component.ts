import { Component, ElementRef, OnInit } from '@angular/core';
import { Error } from '../../../../../model/error.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EdiValidators } from '../../../../../services/edi-validators';
import { ApiService } from '../../../../../services/api.service';
import { SessionService } from '../../../../../services/session.service';
import { Person } from '../../../../../model/person.model';
import { DropDownService } from '../../../../../services/drop-down.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormService } from '../../../../../services/form.service';
import { ResponseService } from '../../../../../services/response.service';
import { Constants } from '../../../../../services/constants';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css']
})
export class SecurityQuestionsComponent implements OnInit {

  errorMsgs: Error[];
  warningMsgs = [];

  questionsForm: FormGroup;
  answer1: FormControl;
  answer2: FormControl;

  question1: string;
  question2: string;

  questionsLocked: boolean = false;

  showEmailSuccess: boolean = false;

  emailTypeFlow: string = this.constants.FORGOT_PASSWORD_WITH_PIN;

  user: Person;

  constructor(private apiService: ApiService, private session: SessionService, private dropDownService: DropDownService,
    private _location: Location, private formService: FormService, private responseService: ResponseService,
    private router: Router, public authService: AuthService, public element: ElementRef, private constants: Constants) {
  }

  ngOnInit() {

    this.user = this.session.getCurrentUser();

    let securityQuestions = [];
    this.dropDownService.getSecurityQuestionList().subscribe(values => {
      securityQuestions = values;
      this.question1 = this.dropDownService.findKeyInMap(securityQuestions,
        this.user.personSecurityDetail.question1).value;
      this.question2 = this.dropDownService.findKeyInMap(securityQuestions,
        this.user.personSecurityDetail.question2).value;
    });

    this.answer1 = new FormControl('', [Validators.required, EdiValidators.xss()]);
    this.answer2 = new FormControl('', [Validators.required, EdiValidators.xss()]);

    this.questionsForm = new FormGroup({
      answer1: this.answer1,
      answer2: this.answer2
    }, { updateOn: 'blur' });

    let warnings = [];
    if (this.user.personSecurityDetail.securityAnswerCount === 1) {
      warnings.push({ detail: this.formService.getInvalidErrorMessage('questions', 'first') });
    }

    if (this.user.personSecurityDetail.securityAnswerCount === 2) {
      warnings.push({ detail: this.formService.getInvalidErrorMessage('questions', 'second') });
    }
    this.warningMsgs = warnings;


  }

  onSubmit() {

    this.warningMsgs = [];
    this.errorMsgs = [];

    this.formService.touchControls(this.questionsForm);

    this.errorMsgs = this.formService.validateControlsAndGetList(this.questionsForm, '');

    if (this.errorMsgs.length === 0) {

      this.user.personSecurityDetail.answer1 = this.answer1.value;
      this.user.personSecurityDetail.answer2 = this.answer2.value;

      this.apiService.validateSecurityAnswers(this.user.personSecurityDetail).subscribe(
        data => {
          let errors = this.responseService.validateResponse(data);
          if (errors.length > 0) {
            this.errorMsgs = errors;
            this.user.personSecurityDetail.securityAnswerCount = data.result.securityAnswerCount;
            this.questionsLocked = this.user.personSecurityDetail.securityAnswerCount > 2 ? true : false;
            if (this.questionsLocked) {
              let comp = this;
              setTimeout(function () {
                comp.element.nativeElement.querySelector('.rpass').addEventListener('click', function () {
                  comp.reset_password(comp.apiService);
                });
              }, 20);
            }
          } else {
            this.user.personSecurityDetail.securityAnswerCount = 0; // Reset answer count
            this.authService.validatedForResetPassword = true;
            this.session.current_user.next(this.user);
            this.router.navigate(['/changeExpiredPassword']);
          }
        });
    }

  }

  cancel() {
    this.authService.validatedForResetPassword = false;
    this.authService.validated = false;
    this._location.back();
  }

  reset_password(apiService: ApiService) {
    apiService.sendPasswordPin(this.user).subscribe(data => {
      let errors = this.responseService.validateResponse(data);
      if (errors.length > 0) {
        this.errorMsgs = errors;
      } else {
        this.showEmailSuccess = true;
      }
    }
    );
  }

}
