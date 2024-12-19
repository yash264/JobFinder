const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    refId:{
        type:String
    },
    ferm:{
        type:String
    },
    role:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    imageUrl:{
        type:String
    },
    document:{
        type:String
    },
    pdfUrl:{
        type:String
    },
    yourself:{
        type:String
    },
    status:{
        type:Boolean
    }
})

const applicationData = new mongoose.model("application", applicationSchema);

module.exports = applicationData; 