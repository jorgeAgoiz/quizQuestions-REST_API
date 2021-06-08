const nodemailer = require('nodemailer')

const USER = process.env.MAIL_NAME
const PASS = process.env.APP_GOOGLE_PASS

exports.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: USER,
    pass: PASS
  }
})
