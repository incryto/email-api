const  ip_schema= require('../models/ip');
const request_ip = require('request-ip');

async function ipValidate(req,res,next) {
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
        console.log("user's ip ",ip)
        
        try{
            resp = await  ip_schema.findOne({ip:ip});
            if(resp!=null){
                next()
            }else{
                res.status(200).send({
                    "response_code":401,
                    "message":"Unauthorized user",
                    "response":null
                })
            }
        }catch(e){
            console.log("Error while fetching whitelisted ip ",e)
        }
}

module.exports = ipValidate