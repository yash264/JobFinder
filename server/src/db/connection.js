const mongoose = require("mongoose");

const db= 'mongodb+srv://yp5094280:h6jEx0Brauuank3R@practise.btsrssx.mongodb.net/jobRecord';

mongoose.connect(db).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log("No Connection");
})

/*mongoose.connect("mongodb://localhost:27017/jobfinder" , {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true  // it is not used with recent versions of mongoose
}).then(() => {
    console.log(`connection successful`)
}).catch((e) => {
    console.log(`No connection`);
})*/