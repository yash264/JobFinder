import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


function CreateJob({ fetchJobData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        role: "",
        salary: "",
        eligibility: "",
        skills: "",
        lastDate: "",
        lastTime: "",
        about: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    axios.defaults.withCredentials = true;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/jobCreate',
                {
                    role: formData.role,
                    salary: formData.salary,
                    eligibility: formData.eligibility,
                    skills: formData.skills,
                    lastDate: formData.lastDate,
                    lastTime: formData.lastTime,
                    about: formData.about
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );

            if (response.data.message === "job created") {
                fetchJobData();
                toast.success("Job Created Successfully.");
            }
            else if (response.data === "role must be unique") {
                toast.error("Role must be Unique.");
            }
            else {
                toast.error("Some Error Occured.");
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Some Error Occurred.");
        }

        setLoading(false);
        setIsOpen(false);
    }


    return (
        <>
            <div className="flex justify-center mb-3">
                <button
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
                    onClick={() => setIsOpen(true)}
                >
                    Create a Job
                </button>

                {isOpen && (
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center px-4">
                        <div className="bg-white text-center rounded-lg shadow-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto relative mt-20 p-6">

                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                                onClick={() => setIsOpen(false)}
                            >
                                ✖
                            </button>

                            <h2 className="text-2xl font-semibold mb-4">
                                Create a Job
                            </h2>

                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label htmlFor="role" className="block mb-1">
                                        Role Offered
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter the desired Role"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label htmlFor="salary" className="block mb-1">
                                        Salary in Rupees
                                    </label>
                                    <input
                                        type="number"
                                        id="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter salary offered"
                                    />
                                </div>
                            </div>


                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label htmlFor="eligibility" className="block mb-1">
                                        Eligibility
                                    </label>
                                    <select
                                        id="eligibility"
                                        value={formData.eligibility}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option selected >Choose...</option>
                                        <option>High School X</option>
                                        <option>Inter Mediate XII</option>
                                        <option>Bachelor's of Technology</option>
                                        <option>Bachelor's of Science</option>
                                        <option>Final Year of Graduation</option>
                                        <option>Other's</option>
                                    </select>
                                </div>

                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label htmlFor="skills" className="block mb-1">
                                        Skills Needed
                                    </label>
                                    <input
                                        type="text"
                                        id="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter the skills needed"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label htmlFor="role" className="block mb-1">
                                        Last Date to Apply
                                    </label>
                                    <input
                                        type="date"
                                        id="lastDate"
                                        value={formData.lastDate}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label htmlFor="lastTime" className="block mb-1">
                                        Untill Time
                                    </label>
                                    <input
                                        type="time"
                                        id="lastTime"
                                        value={formData.lastTime}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-2">
                                <label htmlFor="fermName" className="block mb-1">
                                    About
                                </label>
                                <textarea
                                    className="w-full border p-2 rounded mb-3"
                                    type="text"
                                    id="about"
                                    rows={4}
                                    placeholder="Tell us What you are looking..."
                                    value={formData.about}
                                    onChange={handleChange}
                                />
                            </div>

                            {loading && (
                                <div className="flex justify-center w-full">
                                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            )}

                            <button
                                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
                                onClick={handleSubmit}
                            >
                                Create a Job
                            </button>

                        </div>
                    </div>
                )}

                <ToastContainer />
            </div>
        </>
    )
}

export default CreateJob;