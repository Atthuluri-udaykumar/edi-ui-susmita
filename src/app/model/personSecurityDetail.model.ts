export class PersonSecurityDetail {
  question1: string = '';
  question2: string = '';
  answer1: string = '';
  answer2: string = '';
  securityAnswerCount: number = 0;
  passwordChangeCount: number = 0;
  lastLoginTimestamp: Date;

  setSecurityForRegistration(data) {
    this.question1 = data.question1;
    this.question2 = data.question2;
    this.answer1 = data.answer1;
    this.answer2 = data.answer2;
  }
}
