/* eslint-disable class-methods-use-this */
import nodemailer from 'nodemailer';
import logger from '../config/logger';

async function confirm({ email, subject, text }) {
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

  const info = await transporter.sendMail({
    from: 'usmansbk@gmail.com',
    to: email,
    subject,
    text,
  });

  logger.log(info);

  // eslint-disable-next-line no-console
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

export default {
  confirm,
};
