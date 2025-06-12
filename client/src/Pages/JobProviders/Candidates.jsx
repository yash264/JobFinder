import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/JobProvider/Navbar";
import FetchProfile from "../../Components/JobProvider/FetchProfile";
import Confirmation from "../../Components/JobProvider/Confirmation";


function Candidates() {
    const location = useLocation()
    const role = location.state.role;

    const [values, setValues] = useState([]);
    const [query, setQuery] = useState("");

    axios.defaults.withCredentials = true;
    
    const fetchCandidates = async () => {
        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/fetchCandidates',
                {
                    role: role,
                },
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
        fetchCandidates();
    }, [])


    useEffect(() => {
        if (query.trim() != '') {
            const filtered = values.filter((job) =>
                job.name.toLowerCase().startsWith(query.toLowerCase()) ||
                job.email.toLowerCase().startsWith(query.toLowerCase())
            );
            setValues(filtered);
        }
        else {
            fetchCandidates();
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
                                <input
                                    type="text"
                                    class="block w-full px-4 py-2 mb-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                    placeholder="Search based on Name and Email Id"
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
                            <table className="min-w-full divide-y-2 divide-gray-200">
                                <thead className="ltr:text-left rtl:text-right">
                                    <tr className="*:font-medium *:text-gray-900">
                                        <th className="px-3 py-2 whitespace-nowrap">Name of Candidate</th>
                                        <th className="px-3 py-2 whitespace-nowrap">Email Id</th>
                                        <th className="px-3 py-2 whitespace-nowrap">Document</th>
                                        <th className="px-3 py-2 whitespace-nowrap">View Profile</th>
                                        <th className="px-3 py-2 whitespace-nowrap">Accept Application</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {
                                        values === null ? "" : values.map((item) => {
                                            return <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">{item.name}</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{item.email}</td>

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
                                                    <FetchProfile
                                                        role={role}
                                                        email={item.email}
                                                    />
                                                </td>

                                                <td className="px-3 py-2 whitespace-nowrap">
                                                    <Confirmation
                                                        role={role}
                                                        email={item.email}
                                                        status={item.status}
                                                        fetchCandidates={fetchCandidates}
                                                    />
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div >
                </section >
            </div >
        </>
    )
}

export default Candidates;