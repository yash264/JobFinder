import React from "react";
import { FaCode, FaBell, FaEnvelope } from 'react-icons/fa';
import { ImLocation, ImEnvelop } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import "./landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Home() {

    const navigate = useNavigate()

    const redirect = () => {
        navigate("./Admin/adminReg")
    }

    return (
        <>

            <div style={{ backgroundColor: "rgba(16, 18, 15)" }} >

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
                                    <Link class="nav-link" to="./features" style={{ color: "white" }}>Features</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="./about" style={{ color: "white" }}>About</Link>
                                </li>
                            </ul>
                            <div>
                                <button type="button" class="btn btn-danger" onClick={redirect} >Admin Corner</button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="min-h-screen bg-gray-900 text-white">
                    <header className="relative pt-24 pb-32 flex content-center items-center justify-center min-h-screen">
                        <div className="absolute top-0 w-full h-full bg-center bg-cover opacity-50">
                            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                        </div>
                        <div className="container relative mx-auto">
                            <div className="flex flex-wrap items-center">
                                <div class="row ">
                                    <div class="col">
                                        <div class="p-12">
                                            <div className="w-full md:w-6/12 px-4 ml-auto mr-auto text-center">
                                                <div className="">
                                                    <h1 className="text-white font-semibold text-4xl ">
                                                        Welcome to Job Finder
                                                    </h1> <p>Your one-stop platform to track and showcase your skill progress.</p>
                                                    <div className='mt-10 ml-8 text-left'>
                                                        <h3 className='text-white font-semibold text-2xl m-3'>What is Job Finder ?</h3>
                                                        <p className="m-4 text-lg text-gray-300 text-pretty">
                                                            With the increasing popularity of Competitive Environment, it's easy to lose track of upcoming job notification and challenges across various platforms. Missing out on valuable notification can be frustrating. But worry no more! With Job Finder, you can effortlessly keep track of all your skill profiles in one place and never miss another competition.

                                                            Simply sign up with an active emails to start receiving reminders of the upcoming notification for the particular platform jobs. Job Finder is your one-stop platform to monitor and showcase your skill progress. Stay on top of your game and ensure you never miss an opportunity to compete and improve.
                                                        </p></div>
                                                    <Link to="/User/register" style={{ textDecoration: "none" }}><button className="btn btn-outline-primary"  >
                                                        Sign Up Now
                                                    </button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col">
                                        <div class="p-12">
                                            <div className="mt-12 w-full md:w-6/12 px-4 ml-auto mr-auto flex justify-center">
                                                <img
                                                    src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg"
                                                    alt="coding"
                                                    className="max-w-full rounded-lg shadow-lg h-[60vw] md:h-[40vw]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </header>

                    <section className="pt-20 pb-48">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap justify-center text-center mb-24">
                                <div className="w-full lg:w-6/12 px-4">
                                    <h2 className="text-4xl font-semibold">WHAT WE PROVIDE</h2>
                                    <p className="text-lg leading-relaxed m-4 text-gray-400">
                                        Explore the benefits of using our platform
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap">
                                <div class="container text-center">
                                    <div class="row ">
                                        <div class="col">
                                            <div class="p-6">
                                                <div className="w-full md:w-4/12 px-4 text-center">
                                                    <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-8 shadow-lg rounded-lg">
                                                        <div className="px-4 py-5 flex-auto" style={{ backgroundColor: "rgb(145, 146, 148, 0.1)" }}>
                                                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-500">
                                                                <FaCode />
                                                            </div>
                                                            <h6 className="text-xl font-semibold">Track Your Profiles</h6>
                                                            <p className="mt-2 mb-4 text-gray-400">
                                                                Keep a record of all your past activities across different job notifications.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="p-6">
                                                <div className="w-full md:w-4/12 px-4 text-center">
                                                    <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-8 shadow-lg rounded-lg">
                                                        <div className="px-4 py-5 flex-auto" style={{ backgroundColor: "rgb(145, 146, 148, 0.1)" }}>
                                                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-yellow-500">
                                                                <FaBell />
                                                            </div>
                                                            <h6 className="text-xl font-semibold">Get Timely Reminders</h6>
                                                            <p className="mt-2 mb-4 text-gray-400">
                                                                Never worry about missing an opportunity with our timely email reminders.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="p-6">
                                                <div className="w-full md:w-4/12 px-4 text-center">
                                                    <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-8 shadow-lg rounded-lg">
                                                        <div className="px-4 py-5 flex-auto" style={{ backgroundColor: "rgb(145, 146, 148, 0.1)" }}>
                                                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-500">
                                                                <FaEnvelope />
                                                            </div>
                                                            <h6 className="text-xl font-semibold">Email Support</h6>
                                                            <p className="mt-2 mb-4 text-gray-400">
                                                                Get support and assistance through our dedicated email support team.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </section>

                    <section className="bg-gray-800 py-20">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap justify-center text-center mb-24">
                                <div className="w-full lg:w-6/12 px-4">
                                    <h2 className="text-4xl font-semibold text-white">What Our Vision Say</h2>
                                    <p className="text-lg leading-relaxed m-4 text-gray-400">
                                        Hear from our developers
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap">

                                <div className="w-full md:w-4/12 px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-8 shadow-lg rounded-lg p-6">
                                        <div className="px-4 py-5 flex-auto" style={{ backgroundColor: "rgb(145, 146, 148, 0.1)" }}>
                                            <p className="mt-2 mb-4 text-gray-400">
                                            Employment empowers people, enhances their self-esteem, and contributes to mental well-being. It fuels economic growth, reduces poverty, and fosters a sense of purpose among individuals. When new jobs are created, incomes rise, consumer spending increases, and businesses thrive, leading to a robust cycle of prosperity.
                                            </p>
                                            <h6 className="text-xl font-semibold text-white">If you are tired of Sleeping, Eating & Phir Repeating. Then Please Try JOB FINDER.</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    <footer className="bg-gray-900 py-8">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-6/12 px-4 text-center">
                                    <br /><br />
                                    <div class="row">
                                        <div class="col">
                                            <h4>Stay Connected to us</h4>
                                            <p>Check the About section to follow us on our social media platforms for the latest updates and news.</p>
                                        </div>
                                        <div class="col">
                                        </div>
                                        <div class="col-4 " style={{ textAlign: "left" }} >
                                            <p><ImEnvelop /> yash.20222068@mnnit.ac.in</p>
                                            <p><ImLocation /> National Institute of Technology Allahabad</p>
                                        </div>
                                    </div>

                                    <button type="button" style={{ textDecoration: "none", color: "black", borderRadius: "12px" }} >
                                        <a href="mailto:yash.20222068@mnnit.ac.in" class="btn btn-outline-primary"  ><FaEnvelope className='m-1' />  yash.20222068@mnnit.ac.in</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default Home;