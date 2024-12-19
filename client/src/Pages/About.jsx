import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { ImEnvelop } from "react-icons/im";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function About() {

    const navigate = useNavigate()

    const redirect = () => {
        navigate("./Admin/adminReg")
    }

    return (
        <>

            <div style={{ backgroundColor: "rgba(16, 18, 15, 0.9)" }} >

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
                        <div class="col">
                            <div class="p-3" >
                                <div class="card text-center" style={{ backgroundColor: "rgba(16, 18, 15, 0.65)", color: "white" }}>
                                    <div class="card-header">
                                        <h4>YASH PANDEY</h4>
                                        <ImEnvelop /> yash.20222068@mnnit.ac.in
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">About Me</h5>
                                        <a href="https://www.linkedin.com/in/yashpandey02/" style={{color: "white"}} >
                                            <FaLinkedin size={30} />
                                        </a>
                                        <a href="https://github.com/yash264" style={{color: "white"}} >
                                            <FaGithub size={30} />
                                        </a>
                                        <a href="https://www.instagram.com/yash_2k19_/" style={{color: "white"}} >
                                            <FaInstagram size={30} />
                                        </a>
                                        <hr />
                                        <p class="card-text">
                                            Hi, this is Yash. Design & Development.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="p-3">
                                <div class="card text-center" style={{ backgroundColor: "rgba(16, 18, 15, 0.65)", color: "white" }}>
                                    <div class="card-header">
                                        <h4>KARUN PODDAR</h4>
                                        <ImEnvelop /> karun.20224078@mnnit.ac.in
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">About Me</h5>
                                        <a href="#" style={{color: "white"}} >
                                            <FaLinkedin size={30} />
                                        </a>
                                        <a href="#" style={{color: "white"}} >
                                            <FaGithub size={30} />
                                        </a>
                                        <a href="#" target="_blank" style={{color: "white"}} >
                                            <FaInstagram size={30} />
                                        </a>
                                        <hr />
                                        <p class="card-text">
                                            Hello everyOne, it's Karun. Backend Specialist.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default About;