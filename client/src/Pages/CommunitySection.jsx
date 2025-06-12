import React from "react";
import { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import axios from "axios";
import Navbar from "../Components/JobSeeker/Navbar";
import CreateGroup from "../Components/CreateGroup";
import Conversation from "../Components/Conversation";

const socket = io('https://jobfinderserver.onrender.com', {
    withCredentials: true
});


function CommunitySection() {
    const [selectGroup, setSelectGroup] = useState([]);
    const [profileData, setProfileData] = useState([]);

    axios.defaults.withCredentials = true; 

    const fetchUserData = async () => {
        const token = localStorage.getItem("authToken");
        const userType = localStorage.getItem("userType");

        let endpoint;

        if (userType === "jobSeeker") {
            endpoint = 'https://jobfinderserver.onrender.com/api/jobSeeker/fetchUser';
        }
        else if (userType === "jobProvider") {
            endpoint = 'https://jobfinderserver.onrender.com/api/jobProvider/fetchUser';
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

            setProfileData(response.data.value);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    socket.on('connect', () => {
        console.log('Connected to socket server with ID:', socket.id);
    });

    return (
        <>
            <div className="pt-8 sm:pt--6 lg:pt-10">
                <Navbar />

                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-4 lg:px-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">

                            <div>
                                <CreateGroup
                                    socket={socket}
                                    onGroupClick={(group) => {
                                        setSelectGroup(group);
                                    }}
                                    profileData={profileData}
                                />
                            </div>

                            <div>
                                {selectGroup.groupName ? (
                                    <Conversation
                                        socket={socket}
                                        selectGroup={selectGroup}
                                        profileData={profileData}
                                    />
                                ) : (
                                    <div className="relative bg-white border border-transparent bg-clip-padding backdrop-filter backdrop-blur-sm rounded-xl shadow-xl p-6 text-gray-700 max-w-3xl mx-auto m-6 transition-transform hover:scale-[1.01] hover:shadow-2xl">

                                        <h1 className="text-3xl text-center font-extrabold mb-3 tracking-wide">
                                            Let's join
                                            <strong className="text-indigo-600"> Converation </strong>
                                        </h1>

                                        <div className="flex justify-center mb-4">
                                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shadow">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-2M9 20H4v-2a3 3 0 013-3h2m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <p className="text-sm leading-relaxed text-gray-600 mb-2 px-2">
                                            Connect with a growing network of learners, professionals, and mentors. Whether you're preparing for interviews, looking for a collaborator, or just sharing your journey, our community is built for meaningful connections.
                                        </p>

                                        <p className="text-sm leading-relaxed text-gray-600 px-2">
                                            Collaborate on projects, exchange career advice, and support one another — because growth happens faster when we learn together.
                                        </p>
                                    </div>
                                )}

                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default CommunitySection;