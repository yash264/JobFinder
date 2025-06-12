import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";


export default function CreateGroup({ socket, onGroupClick, profileData }) {
    const [values, setValues] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    const [formData, setFormData] = useState({
        groupName: "",
        bio: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        socket.emit("createGroup", {
            groupName: formData.groupName,
            bio: formData.bio,
        });

        setFormData({
            ...formData,
            groupName: "",
            bio: "",
        });

        setLoading(false);
        setIsOpen(false);
    };


    useEffect(() => {
        socket.emit("getAllGroups");

        socket.on("allGroups", (groups) => {
            setValues(groups.message);
        });

        socket.on("groupCreated", (group) => {
            setValues((prev) => [...prev, group.message]);
            toast.success("Group Created Successfully.");
        });

        socket.on("error", (err) => {
            toast.error(err.message);
        });

        return () => {
            socket.off("allGroups");
            socket.off("groupCreated");
            socket.off("error");
        };
    }, []);

    useEffect(() => {
        if (query.trim() != '') {
            const filtered = values.filter((group) =>
                group.groupName.toLowerCase().startsWith(query.toLowerCase())
            );
            setValues(filtered);
        }
        else {
            socket.emit("getAllGroups");
        }
    }, [query]);


    return (
        <>
            <div className="flex flex-col h-screen bg-white border-e border-gray-100">
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">

                    <div className="px-4 py-4 border-b bg-white shrink-0">
                        <div className="flex flex-col sm:flex-row items-stretch gap-2">
                            <input
                                type="text"
                                placeholder="Search"
                                className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                className="px-4 py-2 text-white font-semibold bg-yellow-600 rounded-md hover:bg-yellow-700"
                                onClick={() => setIsOpen(true)}
                            >
                                Create New Group
                            </button>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        Groups
                    </h2>

                    {values && values.length > 0 ? (
                        [...values].reverse().map((item) => (
                            <div
                                key={item._id}
                                onClick={() => onGroupClick(item)}
                                className="cursor-pointer flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{item.groupName}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{item.bio}</p>
                                </div>
                                <div className="text-xs text-gray-500 whitespace-nowrap">
                                    {moment(item.createdAt).format("Do MMM YY, h:mm a")}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No groups found.</p>
                    )}

                    <div className="px-4 py-3 border-t bg-gray-100 shrink-0">
                        <p className="text-xs">
                            <strong className="block font-medium">{profileData.name}</strong>
                            <span>{profileData.email}</span>
                        </p>
                    </div>
                </div>


                {isOpen && (
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center px-4">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto relative mt-20 p-6">
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                                onClick={() => setIsOpen(false)}
                            >
                                ✖
                            </button>

                            <h2 className="text-2xl font-semibold mb-4">
                                Create a New Group
                            </h2>

                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full px-2 mb-4">
                                    <label htmlFor="groupName" className="block mb-1">
                                        Group Name
                                    </label>
                                    <input
                                        type="text"
                                        id="groupName"
                                        value={formData.groupName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter a Unique group name"
                                    />
                                </div>

                                <div className="w-full px-2 mb-4">
                                    <label htmlFor="bio" className="block mb-1">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        id="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Tell something about group"
                                    />
                                </div>
                            </div>

                            {loading && (
                                <div className="flex justify-center w-full">
                                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-center w-full">
                                <button
                                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
                                    onClick={handleSubmit}
                                >
                                    Create it
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <ToastContainer />
            </div>
        </>
    )
}