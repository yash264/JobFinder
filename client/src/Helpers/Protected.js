import React from "react";

export default function Protected() {

    useEffect(() => {

        const verifyUser = async () => {
            const isTokenValid = await checkToken();
            if (isTokenValid.isValid) {
                navigate("/jobSeeker/dashBoard"); // Redirect to main page if token is valid
            }
        };

        verifyUser();

    }, []);

    const checkToken = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) return false;

        try {

            const response = await axios.post('http://localhost:4502/api/jobSeeker/verifyToken', {}, {
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

    return (
        <>
        </>
    )
}