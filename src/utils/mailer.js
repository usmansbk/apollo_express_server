/* eslint-disable class-methods-use-this */
import nodemailer from 'nodemailer';
import template from '../helpers/confirmHMTL';
import logger from '../config/logger';

async function confirm({
  email, subject, text, buttonText,
}) {
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

  transporter.sendMail({
    from: 'usmansbk@gmail.com',
    to: email,
    subject,
    html: template({ title: subject, text, buttonText }),
  }).then((info) => {
    logger.log(info);

    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }).catch(logger.error);
}

export default {
  confirm,
};
