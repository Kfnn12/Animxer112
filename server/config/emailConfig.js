module.exports = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'animetrix013@gmail.com',
    pass: process.env.EMAIL_PASSWORD || "nacatwkwalqpnbzk",
  },
};