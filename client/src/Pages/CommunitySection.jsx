import React from "react";
import { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import axios from "axios";
import Navbar from "../Components/JobSeeker/Navbar";
import CreateGroup from "../Components/CreateGroup";
import Conversation from "../Components/Conversation";


const socket = io('http://localhost:5000');

function CommunitySection() {

    const [selectGroup, setSelectGroup] = useState([]);
    const [profileData, setProfileData] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobSeeker/fetchUser',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                console.log(response.data.value);
                setProfileData(response.data.value);
                
            }
            catch (error) {
                console.log(error);
            }
        }
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
                                <Conversation
                                    socket={socket} 
                                    selectGroup={selectGroup}
                                    profileData={profileData}
                                />
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default CommunitySection;