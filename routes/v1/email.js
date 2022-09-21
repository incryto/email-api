const express = require('express');
require("dotenv").config()
const transporter = require('../../services/email')
const ip_validation = require('../../middlewares/ip-verification');


router = express.Router()


router.post('/send/text',ip_validation,(req,res)=>{
  console.log("user body")
    console.log(req.body)
    var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: req.body.subject,
        text:req.body.text
      };
      console.log("mail options ",mailOptions)
    try{
      transporter.sendMail(mailOptions, function(error, info){
        
        if (error) {
          console.log(error);
          res.status(200).json({
            response_code:501,
            message:"coul'dnt send mail",
            response:null
          })
        } else {
            res.status(200).json({
                response_code:200,
                message:"successfully sent mail",
                response:null
              })
        }
      });
    }catch(e){
      console.log("Error occured on /send/text", e)
      res.status(200).json({
        response_code:501,
        message:"unexpected error occured",
        response:null
      })
    }
   
      
})



router.post('/send/html',ip_validation,(req,res)=>{
    var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: req.body.subject,
        html:req.body.html
      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(200).json({
            response_code:501,
            message:"coul'dnt send mail",
            response:null
          })
        } else {
            res.status(200).json({
                response_code:200,
                message:"successfully sent mail",
                response:null
              })
        }
      });
      
})


router.post('/send/otp',ip_validation,(req,res)=>{
    var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "OTP verification code",
        html:`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Incrypto</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for registering to Incrypto. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${req.body.otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Incrypto</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`
      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(200).json({
            response_code:501,
            message:"could'nt send otp",
            response:null
          })
        } else {
            res.status(200).json({
                response_code:200,
                message:"successfully sent otp",
                response:null
              })
        }
      });
      
})

module.exports = router