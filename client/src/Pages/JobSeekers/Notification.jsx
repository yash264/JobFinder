import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/JobSeeker/Navbar";
import FetchNotification from "../../Components/JobSeeker/FetchNotification";


function Notification() {
    const [values, setValues] = useState([])
    const [query, setQuery] = useState('');
    const [notification, setNotification] = useState(true);

    axios.defaults.withCredentials = true;
    
    const fetchNotification = async () => {
        try {
            const response = await axios.get('https://jobfinderserver.onrender.com/api/fetchNotification',
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
                                        className={`flex-1 py-2 text-center text-white font-semibold rounded-l-lg 
                                            ${notification ? 'bg-indigo-500' :
                                                'bg-gray-500 hover:bg-gray-600'
                                            }`}
                                    >
                                        Live Notification
                                    </button>

                                    <button
                                        onClick={() => setNotification(false)}
                                        className={`flex-1 py-2 text-center text-white font-semibold rounded-r-lg 
                                            ${!notification ? 'bg-indigo-600' :
                                                'bg-gray-500 hover:bg-gray-600'
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
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <FetchNotification
                            notification={notification}
                            values={values}
                            setValues={setValues}
                            query={query}
                            fetchNotification={fetchNotification}
                        />
                    </div>
                </section >

            </div >
        </>
    )
}

export default Notification;