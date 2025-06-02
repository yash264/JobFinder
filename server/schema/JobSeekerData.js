const mongoose = require("mongoose");

const jobSeekerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    mobile:{
        type:Number
    },
    qualification:{
        type:String
    },
    homeTown:{
        type:String
    },
    password:{
        type:String
    },
})

const jobSeekerData = new mongoose.model("jobSeeker",jobSeekerSchema);

module.exports = jobSeekerData; 