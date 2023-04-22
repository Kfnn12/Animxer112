const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

const transporter = nodemailer.createTransport(emailConfig);

async function sendVerificationEmail(to, token) {

  const info = await transporter.sendMail({
    from: '"AnimeTrix" <animetrix013@gmail.com>',
    to,
    subject: 'Verification OTP For AnimeTrix',
    html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>Verification OTP for AnimeTrix</title>
            </head>
            <body>
              <h1>Hello!</h1>
              <p>Thank you for signing up for our AnimeTrix. As part of our verification process, please use the following OTP code:</p>
              <h2>OTP Code: ${token}</h2>
              <p>Please enter this code on our website to verify your email address and activate your account.</p>
              <p>If you did not sign up for our website, please ignore this email.</p>
              <p>Thank you,<br>AnimeTrix Team</p>
            </body>
            </html>`
  });

  console.log(`Email sent to ${to}: ${info.messageId}`);
}

module.exports = sendVerificationEmail