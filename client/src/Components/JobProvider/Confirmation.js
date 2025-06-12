import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


export default function Confirmation({ role, email, status, fetchCandidates }) {
    const [isOpen, setIsOpen] = useState(false);

    axios.defaults.withCredentials = true;
    
    const handleSubmit = async () => {
        setIsOpen(false);
        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/acceptConfirmation',
                {
                    email: email,
                    role: role,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );

            if (response.data.message === "accepted") {
                toast.success("Application Accepted Successfully.");
                fetchCandidates();
            }
            else {
                toast.error("Some Error Occured.");
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <td className="px-3 py-2 whitespace-nowrap">
                {status === true ? (
                    <button
                        className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
                        disabled
                    >
                        Accepted
                    </button>
                ) : (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 text-gray-700 border border-gray-400 rounded-md hover:bg-gray-200 transition duration-200"
                    >
                        click here
                    </button>
                )}
            </td>

            {
                isOpen && (
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center px-4">
                        <div className="bg-white rounded-lg text-center shadow-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto relative mt-20 p-6">

                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                                onClick={() => setIsOpen(false)}
                            >
                                ✖
                            </button>

                            <h2 className="text-2xl font-semibold mb-4">
                                Are you sure want to Accept the Application ?
                            </h2>

                            <button
                                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
                                onClick={handleSubmit}
                            >
                                Yes, Accept it.
                            </button>

                        </div>
                    </div>
                )
            }
            
            <ToastContainer />
        </>
    );
}
