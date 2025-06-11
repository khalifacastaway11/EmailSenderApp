// config/smtpConfig.js
const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  // host: "bulk.smtp.mailtrap.io",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    // user: "api",
    // pass: "27382559c30c63f6cdf4f371d1cff25a",
  },
});

module.exports = transporter;
