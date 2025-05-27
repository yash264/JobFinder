import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { ImEnvelop } from "react-icons/im";
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { FaCode, FaBell, FaLaptop, FaUser, FaEnvelope } from 'react-icons/fa';
import Header from '../Components/Header';

function About() {

    return (
        <>

            <div className="min-h-screen bg-gray-900 text-white">
                <Header />

                <header className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-screen">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-6/12 px-4 text-center">
                            <h4 className="text-3xl font-semibold text-white">Stay Connected</h4>
                            <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-400">
                                Check the About section to follow us on our social media platforms for the latest updates and news. To report any feedback, contact us below:
                            </p>
                            <div className="mt-6">
                                <button className="" type="button">
                                    <a href="mailto:jkpathak83195@gmail.com" className='flex text-gray-300'><FaEnvelope className='m-1' />  codeshrine98@gmail.com</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

            </div>
        </>
    )
}

export default About;