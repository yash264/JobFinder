import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import "./landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Features() {

    const navigate = useNavigate()

    const redirect = () => {
        navigate("./Admin/adminReg")
    }

    return (
        <>

            <div style={{ backgroundColor: "rgba(16, 18, 15, 0.85)" }} >

                <nav class="navbar navbar-expand-lg " style={{ backgroundColor: "rgb(145, 146, 148, 0.6)" }} >
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#" style={{ color: "white" }}>Services</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
                                <li class="nav-item">
                                    <Link class="nav-link" to="/" style={{ color: "white" }}>HomePage</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="../features" style={{ color: "white" }}>Features</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="../about" style={{ color: "white" }}>About</Link>
                                </li>
                            </ul>
                            <div>
                                <button type="button" class="btn btn-danger" onClick={redirect} >Admin Corner</button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div class="container px-4 text-center">
                    <div class="row gx-5">
                        <div class="col" style={{ color: "white", textAlign: "center" }}>
                            <div class="p-3">
                                <p>Employment empowers people, enhances their self-esteem, and contributes to mental well-being. It fuels economic growth, reduces poverty, and fosters a sense of purpose among individuals. When new jobs are created, incomes rise, consumer spending increases, and businesses thrive, leading to a robust cycle of prosperity.</p>
                                <h4>FEATURES</h4>
                                <p>
                                    1.	Build a dynamic web application facilitating real time form submission.<br />
                                    2.	Created a feature that allow user to attach & upload documents.<br />
                                    3.	Implement JWT token to ensure security and privacy of the User.<br />
                                    4.	Designed a visual system which sends auto-generated email.<br />
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="container px-4 text-center">
                    <div class="row gx-5">
                        <div class="col" style={{ color: "white", textAlign: "left" }}>
                            <div class="p-3">
                                <h5>ADMIN</h5>
                                <p> 1. Admin can create a job by providing specified details.</p>
                                <p> 2.	Once job is created, admin can see the candidates list for that role.</p>
                                <p> 3.	Admin can also option to accept the application based on his requirement.</p>
                            </div>
                        </div>
                        <div class="col" style={{ color: "white", textAlign: "left" }}>
                            <div class="p-3">
                                <h5>JOB FINDERS</h5>
                                <p>1. User can register as a fresh candidate and after that logged in.</p>
                                <p>2. After updating their profile, they are eligible to apply for the available notification.</p>
                                <p>3. While registering for a ferm, user have the opportunity to upload the supported document as needed.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Features;