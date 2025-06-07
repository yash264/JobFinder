const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    refId:{
        type:String
    },
    jobRefId:{
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
    yourSelf:{
        type:String
    },
    status:{
        type:Boolean
    }
})

const applicationData = new mongoose.model("application", applicationSchema);

module.exports = applicationData; 