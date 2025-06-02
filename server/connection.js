const mongoose = require("mongoose");
const dotenv=require('dotenv')
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const db=process.env.MONGO_URL;

mongoose.connect(db).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log("No Connection");
})
