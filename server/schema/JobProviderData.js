const mongoose = require("mongoose");

const jobProviderSchema = new mongoose.Schema({
    fermName:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    about:{
        type:String
    },
    location:{
        type:String
    },
    password:{
        type:String
    },
})

const jobProviderData = new mongoose.model("jobProvider", jobProviderSchema);

module.exports = jobProviderData; 