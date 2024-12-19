//backend
//require('dotenv').config();
const express = require("express")
const app = express()
// const PORT = require("port")
const port = process.env.PORT || 4502;
const cors = require("cors");
const hbs = require("hbs");   //partial ke liye
const path = require("path");
require("./db/connection");
const bcrypt = require("bcryptjs")
//const cookieParser = require("cookie-parser")
const auth = require("./middleware/auth.middleware")

//diff between encryption and hashing -> encryption is bad , it is two sided , it is decodable , but hashig is good , it is one sided , and even in hahsing , bcrypt is good one..


const Register = require("./models/registers");
const {json} = require("express")

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
//app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


app.set("view engine","hbs");


const static_path = path.join(__dirname , "../public")
const template_path = path.join(__dirname , "../templates/views");
const partials_path = path.join(__dirname , "../templates/partials");

//humne jo file banayi h , public -> index.html mein ,usko access karne ke liye , uska path define kare h ,as static_path , aur phir usko , niche use kare h

app.use(express.json());

app.use(express.static(static_path));


//The line app.use(express.static(static_path)); in an Express application is used to serve static files, such as HTML, CSS, JavaScript, images, or any other assets that don't require server-side processing.


app.set("view engine" , "hbs");
app.set("views" , template_path);
hbs.registerPartials(partials_path);

// app.get("/" , (req, res) => {
//     res.send("hello guys")
// })

app.get("/" , (req, res) => {
    res.render("index")
})

app.get("/secret" ,auth , (req, res) => {
    // console.log(`this is the console here ${req.cookies.jwt}`)
    res.render("secret")
}) 
//This route handler simply renders a page, which is a synchronous operation. There’s no need to perform any async database queries or logic in this route handler.

//The auth middleware already handles asynchronous tasks (e.g., token verification


app.get("/logout" , auth  , async(req ,res) => {
    try{
        console.log(req.user);

        //use filter to logout from current device
        // req.user.tokens = req.user.tokens.filter((currElement) =>{
        //     return currElement.token !== req.token
        // })

        //logout from all devices
        req.user.tokens = [];

        res.clearCookie("jwt");
        console.log("logout successfully");

        await req.user.save();
        res.render("login");
    }catch(error){
        res.status(500).send(error);
    } 
})
// the use of async allows you to use await inside the route handler, which is useful if you want to perform asynchronous operations like clearing cookies or logging out the user (e.g., deleting a session from a database or performing other cleanup tasks that might be async).

app.get("/register" , (req, res) => {
    res.render("register")
})

app.get("/login" , (req, res) => {
    res.render("login")
})

//create a new user in our database
app.post("/register" , async(req, res) => {
    try{
       const password = req.body.password.trim();
       const confirmpassword = req.body.confirmpassword.trim();

       if(password === confirmpassword){
        const registerEmployee = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
            age: req.body.age,
            password: password,
            confirmpassword: confirmpassword,

        })

        // console.log("the success part " + registerEmployee);

        const token = await registerEmployee.generateAuthToken();

        // console.log("the token part " + token);

        //the res.cookie() function is used to set cookie name to value
        //syntax:
        // res.cookie(name  , value , [optional])

        res.cookie("jwt" , token ,{
            expires:new Date(Date.now() + 30000),
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        });

        // console.log("Cookie set successfully")
        // console.log("Incoming request body:", req.body);


        const registered = await registerEmployee.save();
        // console.log("the page part " + registered)
        res.status(201).render("index");


       }else{
        res.send("password are not matching")
       }

    }catch(error){
        res.status(400).send(error);
        console.log("the error part page")
    }

})


//login check
app.post("/login" , async(req ,res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password , useremail.password);

        const token = await useremail.generateAuthToken();

        console.log("the token part " + token);

        res.cookie("jwt" , token ,{
            expires:new Date(Date.now() + 600000),
            httpOnly:true,
            
           
        });

        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("Invalid login details");
        }

    }catch(error){
        res.status(400).send("Invalid login details")
    }
})

//If it exists, it serves the file directly to the client.
// If it doesn't exist, the request moves to the next middleware or route handler


// console.log(path.join(__dirname , "../"))


app.use("/api", UserRoute)
app.use("/api", AdminRoute)
app.use("/api", JobRoute)
app.use("/api", ApplicationRoute)

const jwt = require("jsonwebtoken");
const { createDiffieHellmanGroup } = require("crypto");

// const createToken = async() => {
//     const token = await jwt.sign({_id:"675ae5dfcacd7efda1ba39d7"} , "achauscuahscbahcbahssbchahbscshbabhcbahbh" , {
//         expiresIn: "2 seconds"
//     })
//     console.log(token)

//     const userVer = await jwt.verify(token ,"achauscuahscbahcbahssbchahbscshbabhcbahbh")
//     console.log(userVer)
// }

// createToken();
// JWT is commonly used to verify the identity of a user after they log in to an application.


app.listen(port , (req , res)=>{
    console.log( `Server is running at ${port}`)
}) 

// console.log(process.env.SECRET_KEY)   


//NOTE;-
//Use async when:
// You need to perform asynchronous operations (e.g., database queries, API calls, or other I/O tasks) within the route handler

//Don't use async when:
// Your route handler only performs synchronous operations (e.g., rendering a page, sending a response) and does not rely on asynchronous logic.
