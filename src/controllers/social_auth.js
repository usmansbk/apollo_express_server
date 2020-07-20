import { BadRequest, Unauthorized, Forbidden } from '../helpers/errors';
import mailer from '../utils/mailer';

require('dotenv').config();

const { APP_NAME } = process.env;
/**
 * Welcome!
 * Thank you for signing up with ${appName}! We hope you enjoy your time with us.
 * Check your account and update your profile.
 */
export default class SocialAuth {
  static socialLogin() {
    return null;
  }

}
