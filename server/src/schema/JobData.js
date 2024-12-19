const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    refId:{
        type:String
    },
    gmail:{
        type:String
    },
    ferm:{
        type:String
    },
    role:{
        type:String
    },
    eligibility:{
        type:String
    },
    skills:{
        type:String
    },
    salary:{
        type:Number
    },
    lastDate:{
        type:Date
    },
    aboutUs:{
        type:String
    }
})

const jobData = new mongoose.model("job",jobSchema);

module.exports = jobData; 