const mongoose = require("mongoose");

const employmentSchema = new mongoose.Schema({
    refId:{
        type:String
    },
    role:{
        type:String
    },
    salary:{
        type:Number
    },
    eligibility:{
        type:String
    },
    skills:{
        type:String
    },
    applyTill:{
        type:Date
    },
    about:{
        type:String
    }
})

const employmentData = new mongoose.model("employment",employmentSchema);

module.exports = employmentData; 