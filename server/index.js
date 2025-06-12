//backend
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const hbs = require("hbs");  
const path = require("path");
const dotenv=require('dotenv');
const cookieParser = require("cookie-parser");

const initSocket = require("./socket");
require("./connection");

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const port = process.env.port;


const JobSeeker = require("./routes/JobSeeker.route");
const JobProvider = require("./routes/JobProvider.route");
const EmploymentRoute = require("./routes/Employment.route");
const ApplicationRoute = require("./routes/Application.route");

const corsOptions ={
    origin: "https://jobfinder-meta.vercel.app",
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
app.use("/api", EmploymentRoute)
app.use("/api", ApplicationRoute)


const server = http.createServer(app);
initSocket(server);


app.get('/startServer', (req, res) => {
    res.status(200).send("Started the Server");
})

server.listen(port, () => {
    console.log( `Server is running at ${port}`)
}) 
