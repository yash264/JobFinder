import React from 'react';
import { FaCode, FaUsers } from 'react-icons/fa';
import { SiOpenai } from "react-icons/si";
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function Home() {

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-white">
                <Header />

                <header className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-screen">
                    <div className="absolute top-0 w-full h-full bg-center bg-cover opacity-50">
                        <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                    </div>

                    <div className="container relative mx-auto">
                        <div className="flex flex-wrap items-center">
                            <div className="w-full md:w-6/12 px-4 ml-auto mr-auto text-center">
                                <div className="">
                                    <h1 className="text-white font-semibold text-4xl m-2">
                                        Welcome to Job Finder
                                    </h1>
                                    <p>
                                        Your one-stop platform to track and showcase your skill progress.
                                    </p>

                                    <div className='mt-10 ml-8 text-left'>
                                        <h3 className='text-white font-semibold text-2xl m-3'>
                                            What is Job Finder ?
                                        </h3>

                                        <p className="m-4 text-lg text-gray-300 text-pretty">
                                            With the increasing popularity of competitive environments, it's easy to lose track of upcoming job notifications and challenges across various platforms. With Job Finder, you can effortlessly keep track of all your skill profiles in one place and never miss another competition.
                                        </p>

                                        <p className="m-4 text-lg text-gray-300 text-pretty">
                                            Job Finder is your one-stop platform to monitor and showcase your skill progress. Stay on top of your game and ensure you never miss an opportunity to compete and improve.
                                        </p>

                                    </div>

                                    <Link to="/jobSeeker/authentication">
                                        <button className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                                            Job Finders
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-12 w-full md:w-6/12 px-4 ml-auto mr-auto flex justify-center">
                                <img
                                    src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg"
                                    alt="coding"
                                    className="max-w-full rounded-lg shadow-lg h-[60vw] md:h-[40vw]"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <section className="pt-20 pb-20">
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
                            <div className="w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-8 shadow-lg rounded-lg">

                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-500">
                                            <FaCode />
                                        </div>
                                        <h6 className="text-xl font-semibold">
                                            Track Your Profile
                                        </h6>
                                        <p className="mt-2 mb-4 text-gray-400">
                                            Get real-time alerts for openings as our platform consolidates job notifications into one seamless dashboard.
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-8 shadow-lg rounded-lg">

                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-yellow-500">
                                            <FaUsers />
                                        </div>
                                        <h6 className="text-xl font-semibold">
                                            Community Section
                                        </h6>
                                        <p className="mt-2 mb-4 text-gray-400">
                                            Learn and grow in a collaborative environment designed to help and share career goals and skills.
                                        </p>
                                    </div>

                                </div>
                            </div>



                            <div className="w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-8 shadow-lg rounded-lg">

                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-500">
                                            <SiOpenai />
                                        </div>
                                        <h6 className="text-xl font-semibold">
                                            AI Recommendation
                                        </h6>
                                        <p className="mt-2 mb-4 text-gray-400">
                                            Our intelligent system deliver's you personalized job recommendations and competitive opportunities.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-gray-800 pt-20 py-8">
                    <div className="container mx-auto px-4">

                        <div className="flex flex-wrap justify-center text-center mb-24">
                            <div className="w-full lg:w-6/12 px-4">
                                <h2 className="text-4xl font-semibold">
                                    STAY CONNECTED
                                </h2>
                                <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-400">
                                    Check the About section to follow us on our social media platforms for the latest updates and news.
                                </p>
                            </div>
                        </div>

                    </div>
                </footer>
            </div>
        </>
    )
}

export default Home;