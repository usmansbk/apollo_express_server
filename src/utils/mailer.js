/* eslint-disable class-methods-use-this */
import nodemailer from 'nodemailer';
import confirmTemplate from '../helpers/confirmEmail';
import welcomeTemplate from '../helpers/welcomeEmail';
import reportTemplate from '../helpers/reportEmail';
import logger from '../config/logger';
import retryHandler from './retryHandler';

require('dotenv').config();

async function confirm({
  email, subject, text, buttonText, expiresIn, token,
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
      from: process.env.OWNER_EMAIL,
      to: email,
      subject: `${process.env.APP_NAME} ${subject}`,
      html: confirmTemplate({
        title: subject, text, buttonText, expiresIn, token,
      }),
    }).then((info) => {
      logger.log(info);
      logger.debug('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}

async function welcome({ email, userName }) {
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
      from: process.env.OWNER_EMAIL,
      to: email,
      subject: `Welcome to ${process.env.APP_NAME}`,
      html: welcomeTemplate({
        title: `Welcome to ${process.env.APP_NAME}`,
        userName,
      }),
    }).then((info) => {
      logger.log(info);
      logger.debug('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}

async function report({ subject, date, message }) {
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
      from: process.env.OWNER_EMAIL,
      to: process.env.REPORT_EMAIL,
      subject: `${process.env.APP_NAME} ${subject}`,
      html: reportTemplate({
        subject,
        date,
        message,
      }),
    }).then((info) => {
      logger.log(info);
      logger.debug('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}

export default {
  confirm,
  welcome,
  report,
};
