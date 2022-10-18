import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import systemErrors from './system-errors';

const ZIP_CODE = /^[0-9]{5}(?:-[0-9]{4})?(?:-[_]{4})?$/;

const EMAIL_REGEXP =
  // tslint:disable-next-line:max-line-length
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const FILE_NAME_REGEXP = /^((?![!"%*\\/:><?|,]).)*$/;

const PASSWORD = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*$/;

export const BEGINLETTER = /^[a-zA-Z]/;
export const HASNUMMBER = /\d/;
export const HASLOWCASE = /[a-z]/;
export const HASUPCASE = /[A-Z]/;
export const HASSPCHAR = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

export const ALPHANUMERIC = /^[0-9A-Za-z]+$/;

// tslint:disable-next-line:max-line-length
export const XSS = /^.*(((s|S)(e|E)(l|L)(e|E)(c|C)(t|T)[\s\t]+.*(f|F)(r|R)(o|O)(m|M))|((i|I)(n|N)(s|S)(e|E)(r|R)(t|T)[\s\t]+.*(i|I)(n|N)(t|T)(o|O))|((u|U)(p|P)(d|D)(a|A)(t|T)(e|E)[\s\t]+.*(s|S)(e|E)(t|T))|((a|A)(l|L)(t|T)(e|E)(r|R)[\s\t]+.*(s|S)(e|E)(t|T))|((d|D)(e|E)(l|L)(e|E)(t|T)(e|E)[\s\t]+.*(f|F)(r|R)(o|O)(m|M))|((d|D)(e|E)(l|L)(e|E)(t|T)(e|E)[\s\t]+.*(r|R)(d|D)(s|S)\_.*)|((d|D)(e|E)(l|L)(e|E)(t|T)(e|E)[\s\t]+.*(r|R)(p|P)(t|T)\_.*)|(?:^|[^a-zA-Z])(c|C)(o|O)(m|M)(m|M)(i|I)(t|T)|(?:^|[^a-zA-Z])(r|R)(o|O)(l|L)(l|L)(b|B)(a|A)(c|C)(k|K)|(w|W)(a|A)(i|I)(t|T)(f|F)(o|O)(r|R)(.*)(d|D)(e|E)(l|L)(a|A)(y|Y)|(w|W)(a|A)(i|I)(t|T)(f|F)(o|O)(r|R)(.*)(t|T)(i|I)(m|M)(e|E)|(w|W)(a|A)(i|I)(t|T)(f|F)(o|O)(r|R)(.*)(r|R)(e|E)(c|C)(e|E)(i|I)(v|V)(e|E)|(w|W)(a|A)(i|I)(t|T)(f|F)(o|O)(r|R)(.*)(g|G)(e|E)(t|T)|(([=|<|>]+[\s\t]*[\w]+[\s\t]+(o|O)(r|R))|([\s\t]+(o|O)(r|R)[\s\t]+[\w]+[\s\t]*[=|<|>]+[\w]+)))($|([\s\t]+.*$))/;

export const RESTRICTED_WORD_LIST = ['welcome', 'cms', 'hcfa', 'system', 'letmein',
  '1234', '567890', '43210', '098765', 'january',
  'march', 'april', 'may', 'june', 'july', 'august',
  'october', 'admin', 'pwd', 'retiree', 'drug', 'subsidy',
  'qwerty', 'passw0rd', 'pa55word', 'pa55w0rd', 'l3tm31n',
  'february', '12345678', 'medicaid', 'medicare', '76543210',
  'password', 'september', 'security', 'november', 'december'];

export class EdiValidators {

  static isValidFileName(fileName) {
    return FILE_NAME_REGEXP.test(fileName);
  }

  /**
   * Validator that verifies if the current field only contains white spaces
   */
  static whitespace(message?: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // If input field is empty then required validator should fire and not this
        return null;
      }
      const isWhitespace = (control.value.toString() || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : {'whitespace': message};
    };
  }

  /**
   * Validator that verifies if the current field contains a valid email address.
   */
  static email(message?: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // If input field is empty then required validator should fire and not this
        return null;
      }

      return EMAIL_REGEXP.test(control.value) ? null : {'email': message};
    };
  }


  /**
   * Validator that requires controls to have a value to equal another control.
   */
  static equalTo(equalControlName: string, message: string, absolute = false): ValidatorFn | null {

    return (control: AbstractControl): { [key: string]: any } => {
      if (!control['_parent']) {  // Checking the formGroup that contains the controls to compare
        return null;
      }

      if (!control['_parent'].controls[equalControlName]) {
        throw new TypeError('Form Control ' + equalControlName + ' does not exists.');
      }

      const controlMatch = control['_parent'].controls[equalControlName];

      if (!absolute && (!controlMatch.value || !control.value)) {
        return null;
      }

      return controlMatch.value === control.value ? null : {'equalTo': message};
    };
  }

  static contains(containsControlName: string, message: string): ValidatorFn | null {

    return (control: AbstractControl): { [key: string]: any } => {
      if (!control['_parent']) {  // Checking the formGroup that contains the controls to compare
        return null;
      }

      if (!control['_parent'].controls[containsControlName]) {
        throw new TypeError('Form Control ' + containsControlName + ' does not exists.');
      }

      const controlMatch = control['_parent'].controls[containsControlName];

      if (!controlMatch.value || !control.value) {
        return null;
      }

      return control.value.toUpperCase().indexOf(controlMatch.value.toUpperCase()) ?
        null : {'contains': message};
    };
  }

  static password(message: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      return PASSWORD.test(control.value) ? null : {'password': message};
    };
  }

  static loginId(message = systemErrors['error.loginId.invalid']): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      return ALPHANUMERIC.test(control.value) ? null : {'loginid': message};
    };
  }

  static alphaNumeric(message?: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      return ALPHANUMERIC.test(control.value) ? null : {'alphanumeric': message};
    };
  }

  static minLength(limit: number, message?: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      return control.value.length >= limit ? null : {'minLength': message};
    };
  }

  static maxLength(limit: number, message: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      return control.value.length <= limit ? null : {'maxLength': message};
    };
  }

  /**
   * Validator that requires controls to have a value to different to the value of other control.
   */
  static notEqualTo(notEqualControlName: string, message: string): ValidatorFn | null {

    return (control: AbstractControl): { [key: string]: any } => {
      if (!control['_parent']) {  // Checking the formGroup that contains the controls to compare
        return null;
      }

      if (!control['_parent'].controls[notEqualControlName]) {
        throw new TypeError('Form Control ' + notEqualControlName + ' does not exists.');
      }

      const controlMatch = control['_parent'].controls[notEqualControlName];

      if (!controlMatch.value || !control.value) {
        return null;
      }

      return controlMatch.value !== control.value ? null : {'notEqualTo': message};
    };
  }

  static getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  static ageGreaterThan(limit: number = 16, message: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }

      return this.getAge(control.value) >= limit ? null : {'ageGreaterThan': message};
    };
  }

  static greaterThan(limit: number, message: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      if (isNaN(control.value)) {  // If value is not a number
        return null;
      }

      return control.value >= limit ? null : {'greaterThan': message};
    };
  }

  static dobYear(message = systemErrors['error.generic.dateOfBirth.futureDate']): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {

      if (!control.value) {
        // If input field is empty then required validator should fire and not this
        return null;
      }

      // let dobYearMin: number = (new Date().getFullYear() - 150);
      let dobYearMax: number = (new Date().getFullYear());

      if (control.value < 1 || control.value > dobYearMax) {
        return {'dobYearError': message};
      }

      return null;
    };
  }

  static dobDay(message = systemErrors['error.generic.dateOfBirth.invalid']): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {

      if (!control.value) {
        // If input field is empty then required validator should fire and not this
        return null;
      }

      if (control.value < 1 || control.value > 31) {
        return {'dobDayError': message};
      }

      return null;
    };
  }

  static dobMonth(message = systemErrors['error.dateOfBirth.invalid']): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {

      if (!control.value) {
        // If input field is empty then required validator should fire and not this
        return null;
      }

      if (control.value < 1 || control.value > 12) {
        return {'dobMonthError': message};
      }

      return null;
    };
  }

  static ssn(message?: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      let tempSsn = parseInt(control.value, 10);
      let ssnLength = control.value.toString().length;
      return ssnLength === 9 && tempSsn !== 0 ? null : {'ssn': message};
    };
  }

  static zipCode(message?: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      // required when using Inputmask -- might get fixed in a future version of primeng-lts
      // let removedSpaces = control.value.trim();
      // control.value !== removedSpaces && control.setValue(removedSpaces); 

      return ZIP_CODE.test(control.value) ? null : {'zipCode': message};
    };
  }

  static reserved(message?: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }

      if (!message) {
        message = 'true';
      }

      for (let val of RESTRICTED_WORD_LIST) {
        if (control.value.toLowerCase().includes(val) > 0) {
          return {'reserved': message};
        }
      }

      return null;
    };
  }

  static xss(message?: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      return XSS.test(control.value) ? {'xss': message} : null;
    };
  }

  /* Validator that only accepts values different than the one specified */
  static differentThan(forbiddenValue: string, message: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      if (!forbiddenValue) {  // If forbidden value is null there is nothing to compare to
        return null;
      }

      return control.value === forbiddenValue ? {'forbiddenValue': message} : null;
    };
  }

  /**
   * Validator that should be applied to the main component of a pair of components that should match or have equal values.
   * Should be used in conjunction with the equalTo Validator.
   */
  static mainFieldEqualTo(equalControlName: string, message: string, absolute = false): ValidatorFn | null {

    return (control: AbstractControl): { [key: string]: any } => {
      if (!control['_parent']) {  // Checking the formGroup that contains the controls to compare
        return null;
      }

      if (!control['_parent'].controls[equalControlName]) {
        throw new TypeError('Form Control ' + equalControlName + ' does not exists.');
      }

      const controlMatch: AbstractControl = control['_parent'].controls[equalControlName];

      if (!absolute && (!controlMatch.value || !control.value)) {
        return null;
      }

      if (controlMatch.value === control.value) {
        controlMatch.setErrors(null);
      } else {
        controlMatch.setErrors({'equalTo': message});
      }

      return null; // The error applies to the matching component
    };
  }

  /**
   * Validator only to be applied in primeng-lts InputMask elements.
   */
  static requiredMasked(message?: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {  // If input field is empty then required validator should fire and not this
        return null;
      }
      return XSS.test(control.value) ? {'xss': message} : null;
    };
  }


  static requiredTrue(message?: string): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } => {
      // If input field is empty then required validator should fire and not this
      if (!control.value || (control.value && !control.value.checked)) {
        return {'requiredTrue': message};
      }
      return null;
    };
  }

}