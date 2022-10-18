import {environment} from '../../environments/environment';

let environmentUrl = environment.url;

const errors = {
  'error.required.template': '{$Field$} is required. Enter a valid value in the {$Field$} field.',
  'error.select.required.template': '{$Field$} is required. Please select a valid {$Field$}.',
  'error.invalid.template': '{$Field$} is invalid. Enter a valid value in the {$Field$} field.',
  'error.notEqual.template': '{$Field$} entries do not match.',

  'error.generic.dateOfBirth.futureDate': 'Date of Birth in future. Date of Birth can not be a future date.',
  'error.generic.extension.invalid': 'Extension invalid. Extension must be a number between 1 and 99999.',
  'error.generic.password.invalid': 'Password invalid. Password entered does not meet the requirements.',
  'error.generic.password.notEqual': 'Password entries must match.',
  'error.generic.password.containsLoginId': 'Password cannot contain the Login ID.',
  'error.generic.emailId.notEqual': 'The email address entries do not match. Enter a valid email address.',
  'error.generic.question.equal': 'Security Questions cannot be the same. Please select two different Security Questions.',
  'error.generic.passPhrase.invalid': 'The Pass Phrase does not match the stored Pass Phrase. Verify and re-enter the Pass-Phrase.',
  'error.generic.unauthorized': 'Unauthorized User.',
  'error.generic.forbidden.operation': 'Forbidden Operation.',
  'error.generic.password.minlength': 'Password must be have minimum 8 characters.',
  'error.generic.password.maxlength': 'Password must be have maximum 14 characters.',

  'error.badResponse': 'Oops... something went wrong. Sorry for the inconvenience. Please try again later or ' +
    'contact <a href="' + environmentUrl + '/?q=contact-us" target=\'_blank\'>MSPSC Production Support</a> for assistance.',
  'error.badData': 'There is a problem with your EDI Website Registration. Contact <a href="' + environmentUrl +
    '/?q=contact-us" target=\'_blank\'>MCPSC PS</a> for assistance.',
  'error.generic.checkBox.empty': 'Select the checkbox to confirm that you have reviewed and agree to the User Agreement and Privacy ' +
    'Policy.',
  'error.personInfo.ssn.empty': 'U.S. Social Security Number is required. Enter a valid value in the U.S. Social Security Number field.',

  'error.loginId.alreadyExists': 'Login ID is already in use. Enter a different Login ID.',
  'error.ssn.alreadyExists': 'The Social Security Number you provided is already in use. Users can have only one Login ID, which ' +
    'is identified by unique Social Security Number. Please re-enter the Social Security Number if it was entered incorrectly.',
  'error.invalidOrRequired': 'Invalid Value / Field is required.',
  'error.connection': 'Internal connection problem. Contact <a href="' + environmentUrl +
    '/?q=contact-us" target=\'_blank\'>EDI</a> for assistance.',

  };

export default errors;
