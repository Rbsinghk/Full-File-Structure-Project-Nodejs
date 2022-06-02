const mongoose = require('mongoose');

const otpModel = mongoose.Schema({
    email:String,
    code:String,
    expireIn:Number
})
const otpSchema = new mongoose.model("otpSchema", otpModel);
module.exports = otpSchema;