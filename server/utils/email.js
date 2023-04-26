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
              <title>Login code for AnimeTrix</title>
            </head>
            <body>
              <h1>Hello!</h1>
              <p>Thank you for choosing AnimeTrix as your go-to platform for watching anime. As a registered user, we're providing you with a special login code to access our additional features</p>
              <h2>Your login code is:  ${token}</h2>
              <p>To get started, simply enter this code when prompted upon logging in to your account.</p>
              <p>Thank you,<br>AnimeTrix Team</p>
            </body>
            </html>`
  });

  console.log(`Email sent to ${to}: ${info.messageId}`);
}

module.exports = sendVerificationEmail