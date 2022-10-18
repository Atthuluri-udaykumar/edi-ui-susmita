import {EventEmitter, Injectable} from '@angular/core';
import {Person} from '../model/person.model';
import {SessionStorage} from '../utils/web-storage/decorator/webstorage';
import {SessionStorageService} from '../utils/web-storage/service/web-storage.service';
import {Constants} from './constants';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class RegistrationService {

  @SessionStorage() userManager: Person = new Person();
  @SessionStorage() managerSecurity: {
    loginId: string, password: string,
    question1: string, question2: string, answer1: string, answer2: string
  } = {
    loginId: '',
    password: '',
    question1: '',
    question2: '',
    answer1: '',
    answer2: ''
  };
  @SessionStorage() repEmailSearch: string = '';
  @SessionStorage() userToBeRepresentative: Person = new Person();
  @SessionStorage() flowType: string = '';

  userRepresentative = new EventEmitter<Person>();

  constructor(private sessionStorage: SessionStorageService, private constants: Constants) {

  }

  page: number;

  stagesRegistration: string [] = [
    'Registration',
    'Assign Representative',
    'Account Information',
    'Account Login Information',
    'Account Verification',
    'Account Confirmation',
  ];
  stagesRegistration2: string [] = [
    'Registration',
    'Assign Representative',
    'Account Information'
  ];

  stages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(undefined);

  setStageType(type: string) {
    if (type.indexOf('registration') >= 0) {
      this.stages.next(this.stagesRegistration);
      this.flowType = this.constants.REGISTRATION_PAGE;
    }
    if (type.indexOf('registration2') >= 0) {
      this.stages.next(this.stagesRegistration2);
    }
  }

  clean() {
    this.userManager = new Person();
    this.userToBeRepresentative = new Person();
    this.repEmailSearch = '';
    this.managerSecurity = {loginId: '', password: '', question1: '', question2: '', answer1: '', answer2: ''};
    this.sessionStorage.clean('RegistrationService');
  }

}
