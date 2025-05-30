import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from "../../SvgImage/Auth";

function Authentication() {

    const [login, setLogin] = useState(true);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    

    return (
        <div className="mx-auto max-w-screen-xl text-white px-4 py-8 sm:px-6 lg:px-8">


            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                <div className="pl-8 w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto">
                    <Auth />
                </div>

                <div>
                    <div className="auth-form w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between mb-6">
                            <button
                                onClick={() => setLogin(true)}
                                className={`flex-1 py-2 text-center font-semibold rounded-l-lg ${login ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setLogin(false)}
                                className={`flex-1 py-2 text-center font-semibold rounded-r-lg ${!login ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
                                    }`}
                            >
                                Register
                            </button>
                        </div>

                        {login ? (
                            <form >
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
                                        required
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded font-semibold"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form >
                                <div className="mb-4">
                                    <label htmlFor="name" className="block mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                        required
                                    />
                                </div>


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

export default Authentication;