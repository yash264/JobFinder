import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/JobProvider/Navbar";
import { Profile } from "../../SvgImage/Profile";
import UpdateProfile from "../../Components/JobProvider/UpdateProfile";


function DashBoard() {
    const [values, setValues] = useState([])
    const userType = localStorage.getItem('userType');

    axios.defaults.withCredentials = true;

    const fetchUserData = async () => {
        let endpoint = '';
        let token = '';

        if (userType === 'jobProvider') {
            endpoint = 'https://jobfinderserver.onrender.com/api/jobProvider/fetchUser';
            token = localStorage.getItem('authToken');
        }

        try {
            const response = await axios.get(endpoint,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setValues(response.data.value);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])


    return (
        <>
            <div className="pt-8 sm:pt--6 lg:pt-10">
                <Navbar />

                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-4 lg:px-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                            <div>
                                <div className="pl-8 w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto">
                                    <Profile />
                                </div>
                            </div>

                            <div>
                                <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
                                    <UpdateProfile
                                        fetchUserData={fetchUserData}
                                    />

                                    <table className="min-w-full divide-y-2 divide-gray-200">
                                        <thead className="ltr:text-left rtl:text-right ">

                                        </thead>

                                        <tbody className="divide-y divide-gray-200">
                                            <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">Name of the Ferm</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{values == null ? "" : values.fermName}</td>
                                            </tr>

                                            <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">Email Id</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{values == null ? "" : values.email}</td>
                                            </tr>

                                            <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">Mobile Number</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{values == null ? "" : values.mobile}</td>
                                            </tr>

                                            <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">Location</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{values == null ? "" : values.location}</td>
                                            </tr>

                                            <tr className="*:text-gray-900 *:first:font-medium">
                                                <td className="px-3 py-2 whitespace-nowrap">About</td>
                                                <td className="px-3 py-2 whitespace-nowrap">{values == null ? "" : values.about}</td>
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

export default DashBoard;