var express = require('express');
const mongo= require('./services/mongodb');
require('dotenv').config()
app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

email_v1 = require('./routes/v1/email')


app.get('/',(req,res)=>{
    res.status(200).json({
        "response_code":200,
       "message": "Welcome to email service","response":null})
})

app.use('/v1',email_v1)

app.listen(process.env.PORT,(err)=>{
    if(err)
    {console.log("Error while running app")}
    else{
        mongo.set_connection()
        console.log("Successfully running email service at ",process.env.PORT)
    }
}); 