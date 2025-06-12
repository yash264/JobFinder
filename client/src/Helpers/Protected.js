import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Protected() {

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("authToken");
            const userType = localStorage.getItem("userType");

            if (!token || !userType) return;

            const isTokenValid = await checkToken(token, userType);

            if (isTokenValid?.isValid) {
                if (userType === "jobSeeker") {
                    navigate("/jobSeeker/dashBoard");
                }
                else if (userType === "jobProvider") {
                    navigate("/jobProvider/controlPanel");
                }
            }
            else {
                console.warn("Invalid token or user type");

            };
        };

        verifyUser();

    }, []);


    const checkToken = async (token, userType) => {
        let endpoint;

        if (userType === "jobSeeker") {
            endpoint = "https://jobfinderserver.onrender.com/api/jobSeeker/verifyToken";
        }
        else if (userType === "jobProvider") {
            endpoint = "https://jobfinderserver.onrender.com/api/jobProvider/verifyToken";
        }
        else{
            return false;
        }

        try {
            const response = await axios.post(endpoint, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return { isValid: response.data.valid, data: response.data.data };

        } catch (error) {
            console.error(error);
            return false;
        }
    };
}