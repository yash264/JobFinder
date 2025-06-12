import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Ferm } from "../../SvgImage/Ferm";
import Protected from "../../Helpers/Protected";
import { ToastContainer, toast } from 'react-toastify';


function Validation() {
    const [login, setLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fermName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = login
            ? 'https://jobfinderserver.onrender.com/api/jobProvider/login'
            : 'https://jobfinderserver.onrender.com/api/jobProvider/register';

        const payload = login
            ? { email: formData.email, password: formData.password }
            : {
                fermName: formData.fermName,
                email: formData.email,
                password: formData.password,
            };

        try {
            const response = await axios.post(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                payload,
            });

            if (response.data.success) {
                if (!login) {
                    toast.success(response.data.message);
                    setLogin(true);
                }
                else {
                    localStorage.setItem("userType", "jobProvider");
                    localStorage.setItem("authToken", response.data.token);
                    navigate("../jobProvider/controlPanel");
                }
            }
            else {
                if (login) {
                    toast.error(response.data.message);
                }
                else {
                    toast.error(response.data.message);
                }
            }
        }
        catch (error) {
            console.error(error);
            toast.error("An Error occurred during Authentication.");
        }

        setLoading(false);
    };


    return (
        <div className="mx-auto max-w-screen-xl text-white px-4 py-8 sm:px-6 lg:px-8">
            <ToastContainer />
            <Protected />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                <div className="pl-8 w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto">
                    <Ferm />
                </div>

                <div>
                    <div className="auth-form w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between mb-6">
                            <button
                                onClick={() => setLogin(true)}
                                className={`flex-1 py-2 text-center font-semibold rounded-l-lg 
                                    ${login ? 'bg-indigo-600' :
                                        'bg-gray-700 hover:bg-gray-600'
                                    }`
                                }
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setLogin(false)}
                                className={`flex-1 py-2 text-center font-semibold rounded-r-lg 
                                    ${!login ? 'bg-indigo-600' :
                                        'bg-gray-700 hover:bg-gray-600'
                                    }`
                                }
                            >
                                Register
                            </button>
                        </div>

                        {login ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter valid Email Id"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter your Password"
                                        required
                                    />
                                </div>

                                {loading && (
                                    <div className="flex justify-center w-full">
                                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded font-semibold"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="fermName" className="block mb-1">
                                        Name of the Ferm
                                    </label>
                                    <input
                                        type="text"
                                        id="fermName"
                                        value={formData.fermName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter your FermName"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter valid Email Id"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter your Password"
                                        required
                                    />
                                </div>

                                {loading && (
                                    <div className="flex justify-center w-full">
                                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded font-semibold"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Validation;