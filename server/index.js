//backend
const express = require("express")
const app = express()
const cors = require("cors");
const hbs = require("hbs");  
const path = require("path");
const dotenv=require('dotenv');
require("./connection");
const cookieParser = require("cookie-parser")


dotenv.config({ path: path.resolve(__dirname, '../.env') });
const port = process.env.port;


const JobSeeker = require("./routes/JobSeeker.route");
const JobProvider = require("./routes/JobProvider.route");
// const JobRoute = require("./routes/Job.route");
// const ApplicationRoute = require("./routes/Application.route");

const corsOptions ={
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}; 

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


app.set("view engine","hbs");
const views_path = path.join(__dirname,"./public");
app.set("views",views_path);


app.get("/",(req,res)=>{
    res.render("index");
});


app.use("/api", JobSeeker)
app.use("/api", JobProvider)
// app.use("/api", JobRoute)
// app.use("/api", ApplicationRoute)


app.listen(port , (req , res)=>{
    console.log( `Server is running at ${port}`)
}) 
