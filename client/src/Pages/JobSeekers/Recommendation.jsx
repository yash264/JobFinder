import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import moment from "moment";
import Navbar from "../../Components/JobProvider/Navbar";

function Recommendation() {

    const navigate = useNavigate()
    const [values, setValues] = useState([])

    return (
        <>
            <div className="pt-8 sm:pt--6 lg:pt-10">
                <Navbar />

                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-4 lg:px-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">

                            <div>
                                <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
                                    <table className="min-w-full divide-y-2 divide-gray-200">
                                        <thead className="ltr:text-left rtl:text-right">
                                            <tr className="*:font-medium *:text-gray-900">
                                                <th className="px-3 py-2 whitespace-nowrap">Name</th>
                                                <th className="px-3 py-2 whitespace-nowrap">DoB</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200">
                                            <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">Gender</td>
                                                <td className="px-3 py-2 whitespace-nowrap">04/06/1262</td>
                                            </tr>

                                            <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">Email Id</td>
                                                <td className="px-3 py-2 whitespace-nowrap">19/10/1678</td>
                                            </tr>

                                            <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">Mobile Number</td>
                                                <td className="px-3 py-2 whitespace-nowrap">15/03/1593</td>
                                            </tr>

                                            <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">Qualification</td>
                                                <td className="px-3 py-2 whitespace-nowrap">01/09/1971</td>
                                            </tr>

                                            <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">HomeTown</td>
                                                <td className="px-3 py-2 whitespace-nowrap">18/11/1991</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Recommendation;