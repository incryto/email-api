const nodeMailer = require('nodemailer')
require('dotenv').config()

const get_transporter =()=>{
  console.log("email ",process.env.EMAIL)
  console.log("password ",process.env.EMAIL_PASS)
  return nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    }
  });

}

module.exports = get_transporter()