import { DateTime } from 'luxon';
import { PersonSecurityDetail } from './personSecurityDetail.model';

export class Person {
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
  userName: string;
  password: string;
  role: number = 0;
  privilege: string = '';
  validationStatusId: number;
  personSecurityDetail: PersonSecurityDetail = new PersonSecurityDetail();
  emailSecurityId: string = '';
  personalSecurityId: string = '';
  actuaryMemberNumber: string = '';
  companyName: string = '';

  setPersonForRegistration(data) {
    this.firstName = data.firstName;
    this.middleName = data.middleName;
    this.lastName = data.lastName;
    this.dateOfBirth = DateTime.local(+data.dob.year, +data.dob.month, +data.dob.day).toMillis();
    this.ssn = data.ssn;
    this.jobTitle = data.jobTitle;
    this.phoneNumber = data.phoneNumber;
    this.extension = data.extension;
    this.faxNumber = data.faxNumber;
    this.streetLine1 = data.streetLine1;
    this.streetLine2 = data.streetLine2;
    this.city = data.city;
    this.state = data.state;
    this.zipCode = data.zipCode;
  }
}
