import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


function UpdateProfile() {

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/jobProvider/updateUser',
                {
                    fermName: formData.fermName,
                    mobile: formData.mobile,
                    location: formData.location,
                    about: formData.about,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );

            if (response.data.message === "updated user profile") {
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
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500"
                    onClick={() => setIsOpen(true)}
                >
                    Update Profile
                </button>

                {isOpen && (
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center px-4">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto relative mt-20 p-6">

                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                                onClick={() => setIsOpen(false)}
                            >
                                ✖
                            </button>

                            <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>

                            {loading && (
                                <div class="flex justify-center items-center my-4 space-x-2">
                                    <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                                    <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            )}


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
                                        required
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
                                        required
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
                                        required
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

                            <button
                                className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500"
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