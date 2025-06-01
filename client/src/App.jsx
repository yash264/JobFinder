import React from "react";
import { Routes, Route } from "react-router-dom";
import { Element } from 'react-scroll';

import Home from "./Pages/Home";
import Features from "./Pages/Features";
import About from "./Pages/About";
import Footer from "./Components/Footer";

import Authentication from "./Pages/JobSeekers/Authentication";
import ChatBot from "./Components/ChatBot";

import DashBoard from "./Pages/JobSeekers/DashBoard";
import Notification from "./Pages/JobSeekers/Notification";
import Community from "./Pages/JobSeekers/Community";
import Recommendation from "./Pages/JobSeekers/Recommendation";

/*import Register from "./Pages/Register";
import Login from "./Pages/Login";
import DashBoard from "./Pages/DashBoard";
import Notification from "./Pages/Notification";
import ApplicationWindow from "./Pages/ApplicationWindow";
import PastApplication from "./Pages/PastApplication";
import UpgradeSkill from "./Pages/UpgradeSkill";

import AdminReg from "./Pages/Admin/AdminReg";
import AdminLog from "./Pages/Admin/AdminLog";
import AdminDash from "./Pages/Admin/AdminDash";
import CreateJob from "./Pages/Admin/CreateJob";
import Candidates from "./Pages/Admin/Candidates";*/
//import "./App.css";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/about" element={<About />}></Route>

        <Route path="/jobSeeker/authentication" element={<Authentication />}></Route>

        <Route path="/jobSeeker/dashBoard" element={<DashBoard />}></Route>
        <Route path="/jobSeeker/notification" element={<Notification />}></Route>
        <Route path="/jobSeeker/community" element={<Community />}></Route>
        <Route path="/jobSeeker/recommendation" element={<Recommendation />}></Route>

        {/*<Route path="/User/login" element={<Login />}></Route>
          <Route path="/User/dashBoard" element={<DashBoard />}></Route>
          <Route path="/User/notification" element={<Notification />}></Route>
          <Route path="/User/applicationWindow" element={<ApplicationWindow />}></Route>
          <Route path="/User/pastApplication" element={<PastApplication />}></Route>
          <Route path="/User/upgradeSkill" element={<UpgradeSkill />}></Route>

          <Route path="/Admin/adminreg" element={<AdminReg />}></Route>
          <Route path="/Admin/adminLog" element={<AdminLog />}></Route>
          <Route path="/Admin/adminDash" element={<AdminDash />}></Route>
          <Route path="/Admin/createJob" element={<CreateJob />}></Route>
          <Route path="/Admin/candidates" element={<Candidates />}></Route>*/}
      </Routes>

      <Element name="contactUs">
        <Footer />
      </Element>

      <ChatBot />

    </>
  );
}

export default App;
