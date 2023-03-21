import { createHash } from 'crypto';
import bcrypt = require('bcrypt');
import * as nodemailer from 'nodemailer';
import SMTPTransport = require('nodemailer/lib/smtp-transport');
import { EMAIL_SETTING } from '../../../config/config';
import { MessageAccountSuccess } from '../../../config/const';

function hash_265(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

const sendEmail = (to_email: string, subject: string, content: string) =>
  new Promise((resolve) => {
    const transporter = nodemailer.createTransport({
      host: EMAIL_SETTING.MAIL_HOST,
      port: parseInt(EMAIL_SETTING.MAIL_PORT),
      secure: false,
      auth: {
        user: EMAIL_SETTING.ADMIN_EMAIL,
        pass: EMAIL_SETTING.ADMIN_PASSWORD
      }
    });
    const mail_options = {
      from: EMAIL_SETTING.ADMIN_EMAIL,
      to: to_email,
      subject: subject,
      html: content
    };
    return transporter.sendMail(
      mail_options,
      (err, info: SMTPTransport.SentMessageInfo) => {
        if (err) {
          console.log(err);
        }
        resolve(MessageAccountSuccess.SENDED_EMAIL);
      }
    );
  });
function hashMd5(input: string): string {
  return createHash('md5').update(input).digest('hex');
}

async function hashBcrypt(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

async function verifyPassword(
  password_plantext: string,
  hash_password: string
): Promise<boolean> {
  return await bcrypt.compare(password_plantext, hash_password);
}

export { hash_265, hashMd5, hashBcrypt, verifyPassword, sendEmail };
