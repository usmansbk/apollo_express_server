/* eslint-disable class-methods-use-this */
import nodemailer from 'nodemailer';
import template from '../helpers/confirmHMTL';
import logger from '../config/logger';
import retryHandler from './retryHandler';

require('dotenv').config();

async function confirm({
  email, subject, text, buttonText, expiresIn,
}) {
  retryHandler(async () => {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    return transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      html: template({
        title: subject, text, buttonText, expiresIn,
      }),
    }).then((info) => {
      logger.log(info);
      logger.debug('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}

export default {
  confirm,
};
