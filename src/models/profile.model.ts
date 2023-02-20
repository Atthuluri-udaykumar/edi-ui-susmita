
export class ProfileModel {
    personId: number = 0;
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    dateOfBirth: number = 0;
    ssn: string = '';
    jobTitle: string = '';
    phoneNumber: string = '';
    textEnabledNumber: string = '';
    extension: string = '';
    faxNumber: string = '';
    emailAddress: string = '';
    streetLine1: string = '';
    streetLine2: string = '';
    city: string = '';
    state: string = '';
    zipCode: string = '';
    userName: string=''
    password: string=''
    role: number = 0;
    privilege: string = '';
    validationStatusId: number=0;
    personSecurityDetail!: PersonSecurityDetail;
    emailSecurityId: string = '';
    personalSecurityId: string = '';
    actuaryMemberNumber: string = '';
    companyName: string = '';
  }

  export class PersonSecurityDetail {
    question1: string = '';
    question2: string = '';
    answer1: string = '';
    answer2: string = '';
    securityAnswerCount: number = 0;
    passwordChangeCount: number = 0;
    lastLoginTimestamp!: Date;
  }  