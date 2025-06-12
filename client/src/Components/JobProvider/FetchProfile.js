import React from "react";
import { useState } from "react";
import axios from "axios";


function FetchProfile({ role, email }) {
    const [values, setValues] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    axios.defaults.withCredentials = true;

    const fetchProfile = async () => {
        setIsOpen(true);
        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/fetchProfile',
                {
                    role: role,
                    email: email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );

            setValues(response.data.message[0]);
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <button
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
                onClick={() => fetchProfile()}
            >
                click here
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

                        <h2 className="text-2xl font-semibold mb-1">
                            Candidate Profile
                        </h2>

                        <hr className="border-t-2 border-gray-300" />

                        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center justify-between gap-6">
                            <div className="text-left flex-1">
                                <h2 className="text-lg font-semibold text-gray-900">Name of Candidate</h2>
                                <p className="text-base text-gray-700">{values.name}</p>
                            </div>

                            <div>
                                <img
                                    src={values.imageUrl}
                                    alt="Profile Picture"
                                    className="w-24 h-24 rounded object-cover border-2 border-indigo-500 shadow-md"
                                />
                            </div>
                        </div>
                        

                        <table className="min-w-full divide-gray-200">
                            <thead className="ltr:text-left rtl:text-right">
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                <tr className="*:text-gray-900 *:first:font-medium">
                                    <td className="px-3 py-2 whitespace-nowrap">Gender</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{values.gender}</td>
                                </tr>

                                <tr className="*:text-gray-900 *:first:font-medium">
                                    <td className="px-3 py-2 whitespace-nowrap">Email Id</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{values.email}</td>
                                </tr>

                                <tr className="*:text-gray-900 *:first:font-medium">
                                    <td className="px-3 py-2 whitespace-nowrap">Mobile No.</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{values.mobile}</td>
                                </tr>

                                <tr className="*:text-gray-900 *:first:font-medium">
                                    <td className="px-3 py-2 whitespace-nowrap">Qualification</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{values.qualification}</td>
                                </tr>

                                <tr className="*:text-gray-900 *:first:font-medium">
                                    <td className="px-3 py-2 whitespace-nowrap">HomeTown</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{values.homeTown}</td>
                                </tr>

                                <tr className="*:text-gray-900 *:first:font-medium">
                                    <td className="px-3 py-2 whitespace-nowrap">About</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{values.yourSelf}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            )}
        </>
    )
}

export default FetchProfile;