//backend
const express = require("express")
const app = express()
const PORT = require("port")
const port = 5000;
const cors = require("cors");
const hbs = require("hbs");   //partial ke liye
const path = require("path");
require("./db/connection");
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")

//diff between encryption and hashing -> encryption is bad , it is two sided , it is decodable , but hashig is good , it is one sided , and even in hahsing , bcrypt is good one..


const UserRoute = require("./routes/User.route");
const AdminRoute = require("./routes/Admin.route");
const JobRoute = require("./routes/Job.route");
const ApplicationRoute = require("./routes/Application.route");

const corsOptions ={
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}; 

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


//The line app.use(express.static(static_path)); in an Express application is used to serve static files, such as HTML, CSS, JavaScript, images, or any other assets that don't require server-side processing.

app.set("view engine","hbs");
const views_path = path.join(__dirname,"../src/templates");
app.set("views",views_path);


app.get("/",(req,res)=>{
    res.render("index");
});

// the use of async allows you to use await inside the route handler, which is useful if you want to perform asynchronous operations like clearing cookies or logging out the user (e.g., deleting a session from a database or performing other cleanup tasks that might be async).

app.use("/api", UserRoute)
app.use("/api", AdminRoute)
app.use("/api", JobRoute)
app.use("/api", ApplicationRoute)

// JWT is commonly used to verify the identity of a user after they log in to an application.


app.listen(port , (req , res)=>{
    console.log( `Server is running at ${port}`)
}) 


//NOTE;-
//Use async when:
// You need to perform asynchronous operations (e.g., database queries, API calls, or other I/O tasks) within the route handler

//Don't use async when:
// Your route handler only performs synchronous operations (e.g., rendering a page, sending a response) and does not rely on asynchronous logic.
