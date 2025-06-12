import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';


export default function FetchNotification({ notification, values, setValues, query, fetchNotification }) {

    const navigate = useNavigate()
    const [pastValues, setPastValues] = useState([])


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

    axios.defaults.withCredentials = true;

    const showPastApplication = async () => {
        try {
            const response = await axios.get('https://jobfinderserver.onrender.com/api/fetchPastApplication',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            
            setPastValues(response.data.message);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (notification) {
            fetchNotification();
        }
        else {
            showPastApplication();
        }
    }, [notification]);


    useEffect(() => {
        if (query.trim() != '') {
            if (notification) {
                const filtered = values.filter((job) =>
                    job.role.toLowerCase().startsWith(query.toLowerCase()) ||
                    job.fermName.toLowerCase().startsWith(query.toLowerCase())
                );

                setValues(filtered);
            }
            else if (!notification) {
                const filtered = pastValues.filter((job) =>
                    job.role.toLowerCase().startsWith(query.toLowerCase()) ||
                    job.fermName.toLowerCase().startsWith(query.toLowerCase())
                );

                setPastValues(filtered);
            }
        }
        else {
            if (notification) {
                fetchNotification();
            }
            else {
                showPastApplication();
            }
        }
    }, [query]);


    return (
        <>
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
                                    values === null ? "" : values.reverse().map((item) => {
                                        return <tr className="*:text-gray-900 *:first:font-medium">
                                            <td className="px-3 py-2 whitespace-nowrap">{item.fermName}</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{item.role}</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{item.location}</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{moment(item.applyTill).format('Do MMM YY, h:mm a')}</td>

                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <button
                                                    className="rounded bg-blue-600 p-2 text-white transition hover:bg-blue-700"
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
                                    pastValues === null ? "" : pastValues.reverse().map((item) => {
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

                <ToastContainer />
            </div>
        </>
    )
}