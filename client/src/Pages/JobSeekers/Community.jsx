import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import moment from "moment";
import Navbar from "../../Components/Navbar";
import { FiSend, FiImage } from "react-icons/fi";
import { FaVideo } from "react-icons/fa";

function Community() {

    const navigate = useNavigate()
    const [values, setValues] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <>
            <div className="pt-8 sm:pt--6 lg:pt-10">
                <Navbar />

                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-4 lg:px-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">

                            <div className="flex h-screen flex-col justify-between border-e border-gray-100 bg-white">
                                <div className="px-4 py-6">
                                    <input
                                        type="text"
                                        class="block w-full px-8 py-2 mb-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                        placeholder="Search"
                                    />

                                    <ul className="mt-6 space-y-1">
                                        <li>
                                            <a
                                                href="#"
                                                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                            >
                                                General
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="#"
                                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                Billing
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="#"
                                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                Invoices
                                            </a>
                                        </li>

                                    </ul>
                                </div>

                                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                            className="size-10 rounded-full object-cover"
                                        />

                                        <div>
                                            <p className="text-xs">
                                                <strong className="block font-medium">Eric Frusciante</strong>

                                                <span> eric@frusciante.com </span>
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                    <div
                                        className="p-2 rounded-lg max-w-xs bg-blue-500 text-white self-end"
                                    >
                                        Namaste India..
                                    </div>
                                    <div
                                        className="p-2 rounded-lg max-w-xs bg-gray-500 text-white self-end"
                                    >
                                        Incredible India..
                                    </div>
                                </div>

                                <div className="p-4 bg-white flex items-center gap-2 border-t w-full">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="p-2 text-gray-500 hover:text-blue-500"
                                    >
                                        <FiImage size={20} />
                                    </button>
                                    <button className="p-2 text-gray-500 hover:text-blue-500">
                                        <FaVideo size={20} />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-1 p-2 border rounded-lg"
                                    />
                                    <button className="p-2 text-blue-500 hover:text-blue-700">
                                        <FiSend size={20} />
                                    </button>
                                </div>

                            </div>

                            {isModalOpen && (
                                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-gray-700 text-white p-6 rounded-lg w-96 shadow-lg">
                                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                                        <form>
                                            <div className="mb-4">
                                                <label className="block text-sm ">Profile Pic</label>
                                                <input type="file" className="w-full p-2 mt-1 bg-gray-500 rounded-md" placeholder="Enter new username" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm ">Gender</label>
                                                <input type="text" className="w-full p-2 mt-1 bg-gray-500 rounded-md" placeholder="Enter new username" />
                                            </div>
                                            <div className="flex justify-end gap-4">
                                                <button
                                                    type="button"
                                                    className="bg-gray-600 text-white px-4 py-2 rounded-md"
                                                    onClick={() => setIsModalOpen(false)}
                                                >
                                                    Close
                                                </button>
                                                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Community;