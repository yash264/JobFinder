import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


function UpdateProfile ({ fetchUserData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const userType = localStorage.getItem('userType');

    const [formData, setFormData] = useState({
        fermName: "",
        mobile: "",
        city: "",
        state: "",
        location: "",
        about: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        const { state, city } = formData;
        if (state && city) {
            setFormData((prev) => ({
                ...prev,
                location: `${city}, ${state}`,
            }));
        }
    }, [formData.state, formData.city]);

    axios.defaults.withCredentials = true;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let endpoint = '';
        let token = '';

        if (userType === 'jobProvider') {
            endpoint = 'https://jobfinderserver.onrender.com/api/jobProvider/updateUser';
            token = localStorage.getItem('authToken');
        }

        try {
            const response = await axios.post(endpoint,
                {
                    fermName: formData.fermName,
                    mobile: formData.mobile,
                    location: formData.location,
                    about: formData.about,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.message === "updated user profile") {
                fetchUserData();
                toast.success("Updated Profile Successfully");
            }
            else {
                toast.error("Some Error Occurred");
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Some Error Occurred");
        }

        setLoading(false);
        setIsOpen(false);
    }

    return (
        <>
            <div className="flex justify-center m-1">
                <button
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
                    onClick={() => setIsOpen(true)}
                >
                    Update Profile
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
                                Update Your Profile
                            </h2>

                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label htmlFor="fermName" className="block mb-1">
                                        Name of Ferm
                                    </label>
                                    <input
                                        type="fermName"
                                        id="fermName"
                                        value={formData.fermName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter your FermName"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label htmlFor="mobile" className="block mb-1">
                                        Mobile No.
                                    </label>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter Mobile Number"
                                    />
                                </div>
                            </div>


                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label htmlFor="city" className="block mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter your City"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label htmlFor="state" className="block mb-1">
                                        State
                                    </label>
                                    <select
                                        id="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option selected>Choose...</option>
                                        <option>Uttar Pradesh</option>
                                        <option>Madhya Pradesh</option>
                                        <option>New Delhi</option>
                                        <option>Maharastra</option>
                                        <option>Haryana</option>
                                        <option>Rajasthan</option>
                                        <option>Gujrat</option>
                                        <option>Uttarakhand</option>
                                        <option>Other's</option>
                                    </select>
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
                                    placeholder="Tell us About your Ferm..."
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
                                Save Changes
                            </button>

                        </div>
                    </div>
                )}

                <ToastContainer />
            </div>
        </>
    )
}

export default UpdateProfile;