/* eslint-disable class-methods-use-this */
import nodemailer from 'nodemailer';
import template from '../helpers/confirmHMTL';
import logger from '../config/logger';
import retryHandler from './retryHandler';

async function confirm({
  email, subject, text, buttonText,
}) {
  retryHandler(async () => {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
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
      html: template({ title: subject, text, buttonText }),
    }).then((info) => {
      logger.log(info);

      // eslint-disable-next-line no-console
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}

export default {
  confirm,
};
