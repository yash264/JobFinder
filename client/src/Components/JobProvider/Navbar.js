import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();

        localStorage.removeItem("userType");
        localStorage.removeItem("authToken");
        navigate("/");
    }

    return (
        <>
            <header className="fixed top-0 w-full z-50 bg-slate-700">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        <div className="md:flex md:items-center md:gap-12">
                            <a className="block text-white" href="#">
                                <span className="sr-only">Home</span>
                            </a>

                            <img
                                className="h-16 bg-white rounded"
                                src="https://media.licdn.com/dms/image/v2/D4E12AQGsyXeSqLadEw/article-cover_image-shrink_720_1280/B4EZVIFnWRGgAM-/0/1740671186886?e=2147483647&v=beta&t=Mphlll-JGtzPBgBXJrlL7u6r6zw_im2JfkVBaIo0H0s"
                                title="task icons"
                            />

                        </div>

                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li class="nav-item">
                                        <Link to="../jobProvider/controlPanel" className="text-gray-300 transition hover:text-yellow-400 dark:text-white">Control Panel</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="../jobProvider/recruitement" className="text-gray-300 transition hover:text-yellow-400 dark:text-white">Recruitement</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="../jobProvider/communitySection" className="text-gray-300 transition hover:text-yellow-400 dark:text-white">Community Section</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="../jobProvider/recommendation" className="text-gray-300 transition hover:text-yellow-400 dark:text-white">AI Recommendation</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <button
                                    type="button"
                                    className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-rose-700"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>

                            <div className="block md:hidden">
                                <button
                                    onClick={() => setOpen(!isOpen)}
                                    className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {isOpen && (
                        <div className="md:hidden bg-slate-700 px-4 pb-4">
                            <nav>
                                <ul className="flex flex-col gap-4 text-sm">
                                    <li class="nav-item">
                                        <Link to="../jobProvider/controlPanel" className="text-gray-300 transition hover:text-yellow-400 dark:text-white">Control Panel</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="../jobProvider/recruitement" className="text-gray-300 transition hover:text-yellow-400 dark:text-white">Recruitement</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="../jobProvider/communitySection" className="text-gray-300 transition hover:text-yellow-400 dark:text-white">Community Section</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="../jobProvider/recommendation" className="text-gray-300 transition hover:text-yellow-400 dark:text-white">AI Recommendation</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}

                </div>

            </header>
        </>
    )
};

export default Navbar;