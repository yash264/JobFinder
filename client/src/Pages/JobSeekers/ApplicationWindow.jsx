import React from 'react';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Navbar from "../../Components/JobSeeker/Navbar";
import ApplicationForm from '../../Components/JobSeeker/ApplicationForm';


function ApplicationWindow() {

    const location = useLocation()
    const email = location.state.email;
    const role = location.state.role;
    const [values, setValues] = useState([]);

    axios.defaults.withCredentials = true;

    const showDetails = async () => {
        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/application',
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
            
            setValues(response.data.message[0]);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        showDetails();
    }, []);


    return (

        <div className="pt-8 sm:pt-6 lg:pt-10">
            <Navbar />

            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-4 lg:px-8">

                    <div className="flex justify-center">
                        <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">
                            Application
                            <strong class="text-indigo-600"> Window </strong>
                            Portal
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-start md:gap-8">
                        <div className="md:col-span-1 w-full pt-6">
                            <div className="w-full overflow-x-auto rounded border border-gray-300 shadow-sm">

                                <table className="w-full min-w-full divide-y-2 divide-gray-200">
                                    <thead className="text-left">
                                        <tr className="*:font-medium *:text-gray-900">
                                            <th className="px-3 py-2 whitespace-nowrap">Name of the Firm</th>
                                            <th className="px-3 py-2 whitespace-nowrap">{values.fermName}</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="*:text-gray-900 *:first:font-medium">
                                            <td className="px-3 py-2 whitespace-nowrap">Role Offered</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{values.role}</td>
                                        </tr>

                                        <tr className="*:text-gray-900 *:first:font-medium">
                                            <td className="px-3 py-2 whitespace-nowrap">Eligibility</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{values.eligibility}</td>
                                        </tr>

                                        <tr className="*:text-gray-900 *:first:font-medium">
                                            <td className="px-3 py-2 whitespace-nowrap">Skills Needed</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{values.skills}</td>
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
                                            <td className="px-3 py-2 whitespace-nowrap">Location</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{values.location}</td>
                                        </tr>

                                        <tr className="*:text-gray-900 *:first:font-medium">
                                            <td className="px-3 py-2 whitespace-nowrap">Last Date to Apply</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{moment(values.applyTill).format('Do MMM YY, h:mm a')}</td>
                                        </tr>

                                        <tr className="*:text-gray-900 *:first:font-medium">
                                            <td className="px-3 py-2 whitespace-nowrap">Salary in Rupees</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{values.salary}</td>
                                        </tr>

                                        <tr className="*:text-gray-900 *:first:font-medium">
                                            <td className="px-3 py-2 whitespace-nowrap">About</td>
                                            <td className="px-3 py-2 whitespace-nowrap">{values.about}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="md:col-span-1 w-full pt-6">
                            <ApplicationForm
                                values={values}
                            />
                        </div>

                    </div>
                </div>
            </section>

        </div>

    )
}

export default ApplicationWindow;