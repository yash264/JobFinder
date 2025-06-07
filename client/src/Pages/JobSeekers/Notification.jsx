import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/JobSeeker/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import moment from "moment";

function Notification() {

    const navigate = useNavigate()
    const [values, setValues] = useState([])
    const [pastValues, setPastValues] = useState([])
    const [notification, setNotification] = useState(true);

    const handleSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/fetchNotification',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            console.log(response.data.message);
            setValues(response.data.message);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleSubmit();
        showPastApplication();
    }, [notification]);


    const showApplication = (applyTill, email, role) => {
        const scheduled = moment(applyTill).format('Do MMM YYYY, h:mm:ss a');
        const currentTime = moment(Date.now()).format('Do MMM YYYY, h:mm:ss a');

        const ScheduledMoment = moment(scheduled, 'Do MMM YYYY, h:mm:ss a');
        const currentMoment = moment(currentTime, 'Do MMM YYYY, h:mm:ss a');

        if (currentMoment.isBefore(ScheduledMoment)) {
            navigate("../jobSeeker/applicationWindow", {
                state: {
                    email: email,
                    role: role
                }
            })
        }
        else if (currentMoment.isAfter(ScheduledMoment)) {
            toast.error("Registrations are Closed");
        }
    }

    const showPastApplication = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/fetchPastApplication',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            console.log(response.data.message);
            setPastValues(response.data.message);
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="pt-8 sm:pt--6 lg:pt-10">
                <Navbar />

                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-4 lg:px-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <button
                                        onClick={() => setNotification(true)}
                                        className={`flex-1 py-2 text-center text-white font-semibold rounded-l-lg ${notification ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
                                            }`}
                                    >
                                        Live Notification
                                    </button>
                                    <button
                                        onClick={() => setNotification(false)}
                                        className={`flex-1 py-2 text-center text-white font-semibold rounded-r-lg ${!notification ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
                                            }`}
                                    >
                                        Past Application
                                    </button>
                                </div>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    class="block w-full px-4 py-2 mb-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    placeholder="Search"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
                            {notification ?
                                (
                                    <table className="min-w-full divide-y-2 divide-gray-200">
                                        <thead className="ltr:text-left rtl:text-right">
                                            <tr className="*:font-medium *:text-gray-900">
                                                <th className="px-3 py-2 whitespace-nowrap">Name of the Ferm</th>
                                                <th className="px-3 py-2 whitespace-nowrap">Role Offered</th>
                                                <th className="px-3 py-2 whitespace-nowrap">Location</th>
                                                <th className="px-3 py-2 whitespace-nowrap">Last Date to Apply</th>
                                                <th className="px-3 py-2 whitespace-nowrap">Apply Now</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200">
                                            {
                                                values === null ? "" : values.map((item) => {
                                                    return <tr className="*:text-gray-900 *:first:font-medium">
                                                        <td className="px-3 py-2 whitespace-nowrap">{item.fermName}</td>
                                                        <td className="px-3 py-2 whitespace-nowrap">{item.role}</td>
                                                        <td className="px-3 py-2 whitespace-nowrap">{item.location}</td>
                                                        <td className="px-3 py-2 whitespace-nowrap">{moment(item.applyTill).format('Do MMM YY, h:mm a')}</td>

                                                        <td className="px-3 py-2 whitespace-nowrap">
                                                            <button
                                                                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                                                                onClick={
                                                                    () => showApplication(
                                                                        item.applyTill,
                                                                        item.email,
                                                                        item.role
                                                                    )}
                                                            >
                                                                click here
                                                            </button>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                ) :
                                (
                                    <table className="min-w-full divide-y-2 divide-gray-200">
                                        <thead className="ltr:text-left rtl:text-right">
                                            <tr className="*:font-medium *:text-gray-900">
                                                <th className="px-3 py-2 whitespace-nowrap">Name of the Ferm</th>
                                                <th className="px-3 py-2 whitespace-nowrap">Role Offered</th>
                                                <th className="px-3 py-2 whitespace-nowrap">Photo Uploaded</th>
                                                <th className="px-3 py-2 whitespace-nowrap">Document</th>
                                                <th className="px-3 py-2 whitespace-nowrap">Current Status</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200">
                                            {
                                                pastValues === null ? "" : pastValues.map((item) => {
                                                    return <tr className="*:text-gray-900 *:first:font-medium">
                                                        <td className="px-3 py-2 whitespace-nowrap">{item.fermName}</td>
                                                        <td className="px-3 py-2 whitespace-nowrap">{item.role}</td>

                                                        <td className="px-3 py-2 whitespace-nowrap">
                                                            <img
                                                                src={item.imageUrl}
                                                                alt="Profile Picture"
                                                                className="w-24 h-24 rounded object-cover border-2 border-indigo-500 shadow-md"
                                                            />
                                                        </td>

                                                        <td className="px-3 py-2 whitespace-nowrap">
                                                            <a
                                                                href={item.pdfUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-block text-blue-600 hover:text-blue-800 hover:underline transition duration-200 font-medium"
                                                            >
                                                                {item.document}
                                                            </a>

                                                        </td>

                                                        <td className="px-3 py-2 whitespace-nowrap">
                                                            {item.status === true ? (
                                                                <button
                                                                    className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
                                                                    disabled
                                                                >
                                                                    Accepted
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="px-4 py-2 text-gray-700 border border-gray-400 rounded-md hover:bg-gray-100 transition duration-200"
                                                                    disabled
                                                                >
                                                                    Pending...
                                                                </button>
                                                            )}
                                                        </td>

                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                )}
                        </div>
                    </div>
                </section >

                <ToastContainer />
            </div >
        </>
    )
}

export default Notification;