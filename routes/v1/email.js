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
        html:`<h1>OTP verification code</h1><br><h3>your verification code for incrypto is</h3><h1>${req.body.otp}</h1>`
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