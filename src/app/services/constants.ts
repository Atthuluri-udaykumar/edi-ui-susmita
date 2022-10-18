import {Injectable} from '@angular/core';

@Injectable()
export class Constants {
  readonly VERIFY_EMAIL_PIN = 'verifyEmailPin';
  readonly FORGOT_LOGIN_ID = 'forgotLogin';
  readonly FORGOT_PASSWORD_NO_PIN = 'forgotPasswordNoPin';
  readonly FORGOT_PASSWORD_WITH_PIN = 'forgotPasswordWithPin';
  readonly DISABLED_ACCOUNT_WITH_TOKEN = 'disabledAccount';
  readonly DISABLED_ACCOUNT_NO_TOKEN = '3';

  readonly REGISTRATION_PAGE = 'registrationFlow';

  readonly REVIEW_EMAIL = 'INACTIVE';
  readonly PW_CHANGE_180DAY = '180DAY_PW_CHANGE';
}
