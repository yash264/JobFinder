import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Element } from 'react-scroll';

import Home from "./Pages/Home";
import Features from "./Pages/Features";
import About from "./Pages/About";
import Footer from "./Components/Footer";

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

        {/*<Route path="/User/register" element={<Register />}></Route>
          <Route path="/User/login" element={<Login />}></Route>
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

    </>
  );
}

export default App;
