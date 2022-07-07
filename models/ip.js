const mongoose = require('mongoose');


const ip_schema = new mongoose.Schema({
    label:{
        type:String,
        required: [true,"label required"]
    },
    ip:{
        type:String,
        required: [true,"ip required"]
    },
    created_at:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('whitelist', ip_schema)