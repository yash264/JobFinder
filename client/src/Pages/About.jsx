import React from "react";
import { ImEnvelop,  ImLinkedin } from "react-icons/im";
import { FaInstagram } from 'react-icons/fa';
import Header from '../Components/Header';


function About() {

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-white">
                <Header />

                <header className="relative pt-20 pb-20 flex content-center items-center justify-center min-h-screen">
                    <div className="bg-gray-900 px-4 py-12 text-white">
                        <div className="max-w-4xl mx-auto shadow-lg rounded-xl bg-gray-800 p-8">

                            <div className="text-center mb-6">
                                <h3 className="text-3xl font-bold mb-2">
                                    Yash Pandey
                                </h3>
                                <p className="flex justify-center items-center gap-2 text-gray-300 text-sm">
                                    <ImEnvelop />
                                    yash.20222068@mnnit.ac.in
                                </p>
                            </div>


                            <div className="grid md:grid-cols-2 gap-6 bg-gray-700 text-white rounded-lg p-6">
                                <div>
                                    <h5 className="text-xl font-semibold mb-4">
                                        Social Media
                                    </h5>

                                    <ul className="space-y-4 text-left text-base">
                                        <li>
                                            <a
                                                href="https://www.linkedin.com/in/yashpandey02/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 hover:text-blue-600 transition"
                                            >
                                                <ImLinkedin /> Yash Pandey
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.instagram.com/yash_2k19_/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 hover:text-pink-600 transition"
                                            >
                                                <FaInstagram /> yash_2k19_
                                            </a>
                                        </li>
                                    </ul>
                                </div>


                                <div className="text-left text-base leading-relaxed">
                                    <p>
                                        Hello everyone, myself <strong>Yash Pandey</strong>, currently pursuing a Bachelor's of Technology. I’m a pre-final year student at the <strong>National Institute of Technology, Allahabad</strong>, passionate about full-stack development and learning new technologies every day.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

            </div>
        </>
    )
}

export default About;