import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Element } from 'react-scroll';

import Home from "./Pages/Home";
import Features from "./Pages/Features";
import About from "./Pages/About";
import Footer from "./Components/Footer";

import Authentication from "./Pages/JobSeekers/Authentication";
import Validation from "./Pages/JobProviders/Validation";
import ChatBot from "./Components/ChatBot";

import DashBoard from "./Pages/JobSeekers/DashBoard";
import Notification from "./Pages/JobSeekers/Notification";
import ApplicationWindow from "./Pages/JobSeekers/ApplicationWindow";
import Recommendation from "./Pages/JobSeekers/Recommendation";

import CommunitySection from "./Pages/CommunitySection";

import ControlPanel from "./Pages/JobProviders/ControlPanel";
import Recruitement from "./Pages/JobProviders/Recruitement";
import Candidates from "./Pages/JobProviders/Candidates";


function App() {

  const location = useLocation();
  const hideGlobalComponents = location.pathname.startsWith("/community");

  return (
    <>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/about" element={<About />}></Route>

        <Route path="/jobSeeker/authentication" element={<Authentication />}></Route>
        <Route path="/jobProvider/validation" element={<Validation />}></Route>

        <Route path="/jobSeeker/dashBoard" element={<DashBoard />}></Route>
        <Route path="/jobSeeker/notification" element={<Notification />}></Route>
        <Route path="/jobSeeker/applicationWindow" element={<ApplicationWindow />}></Route>
        <Route path="/jobSeeker/recommendation" element={<Recommendation />}></Route>

        <Route path="/communitySection" element={<CommunitySection />}></Route>

        <Route path="/jobProvider/controlPanel" element={<ControlPanel />}></Route>
        <Route path="/jobProvider/recruitement" element={<Recruitement />}></Route>
        <Route path="/jobProvider/candidates" element={<Candidates />}></Route>
        <Route path="/jobProvider/recommendation" element={<Recommendation />}></Route>

      </Routes>

      {!hideGlobalComponents && (
        <>
          <Element name="contactUs">
            <Footer />
          </Element>
          <ChatBot />
        </>
      )}

    </>
  );
}

export default App;
