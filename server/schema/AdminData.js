const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    ferm:{
        type:String
    },
    gmail:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:Number
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    adminDetails:{
        type:Array
    }
})

const adminData = new mongoose.model("admin", adminSchema);

module.exports = adminData; 