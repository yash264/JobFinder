const mongoose = require("mongoose");

const db= 'mongodb+srv://yp5094280:h6jEx0Brauuank3R@practise.btsrssx.mongodb.net/jobRecord';

mongoose.connect(db).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log("No Connection");
})
