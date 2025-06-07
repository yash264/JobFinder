import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Navbar from "../../Components/JobProvider/Navbar";
import CreateJob from "../../Components/JobProvider/CreateJob";

function Recruitement() {

    const [values, setValues] = useState([]);
    const [query, setQuery] = useState('');


    const fetchJobData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/fetchJob',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );

            setValues(response.data.message);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchJobData();
    }, [])


    useEffect(() => {
        if (query.trim() != '') {
            const filtered = values.filter((job) =>
                job.role.toLowerCase().startsWith(query.toLowerCase())
            );
            setValues(filtered);
        }
        else {
            fetchJobData();
        }
    }, [query]);


    return (
        <>
            <div className="pt-8 sm:pt--6 lg:pt-10">
                <Navbar />

                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-4 lg:px-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                            <div>
                                <CreateJob fetchJobData={fetchJobData} />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    class="block w-full px-4 py-2 mb-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    placeholder="Search"
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
                            <table className="min-w-full divide-y-2 divide-gray-200">
                                <thead className="ltr:text-left rtl:text-right">
                                    <tr className="*:font-medium *:text-gray-900">
                                        <th className="px-3 py-2 whitespace-nowrap">Role Offered</th>
                                        <th className="px-3 py-2 whitespace-nowrap">Eligibility</th>
                                        <th className="px-3 py-2 whitespace-nowrap">Salary in Rupees</th>
                                        <th className="px-3 py-2 whitespace-nowrap">Last Date to Apply</th>
                                        <th className="px-3 py-2 whitespace-nowrap">Candidates List</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {
                                        values === null ? "" : values.map((item) => {
                                            return <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">{item.role}</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{item.eligibility}</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{item.salary}</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{moment(item.applyTill).format('Do MMM YY, h:mm a')}</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{item.role}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section >
            </div>
        </>
    )
}

export default Recruitement;