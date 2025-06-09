import React from "react";
import { useState, useEffect, useRef } from "react";
import { FiSend, FiImage } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import Cloudinary from "../Helpers/Cloudinary";
import { toast, ToastContainer } from "react-toastify";

export default function Conversation({ socket, selectGroup, profileData }) {

    const [isOpen, setIsOpen] = useState(false);
    const [uploadType, setUploadType] = useState(null);
    const [values, setValues] = useState([]);

    const [formData, setFormData] = useState({
        type: "text",
        value: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        socket.emit("sendMessage", {
            groupName: selectGroup.groupName,
            name: profileData.name,
            email: profileData.email,
            type: formData.type,
            value: formData.value,
        });
    };

    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [values]);


    useEffect(() => {

        socket.emit("joinGroup", selectGroup);

        // Fetch messages
        socket.emit("getAllMessages", selectGroup);

        // Handle initial fetch
        const handleAllMessages = (data) => {
            setValues(data.message);
        };

        const handleNewMessage = (data) => {
            setValues((prev) => [...prev, data.message]);
        };


        socket.on("allMessages", handleAllMessages);
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.emit("leaveGroup", selectGroup);
            socket.off("allMessages", handleAllMessages);
            socket.off("newMessage", handleNewMessage); // ✅ prevent multiple toasts
        };
    }, [selectGroup, socket]);


    const handleImageUpload = (url) => {
        setFormData((prev) => ({
            ...prev,
            type: uploadType,
            value: url
        }));
        toast.success("Image uploaded successfully!");
        console.log(formData.value);
    };

    const handlePdfUpload = (url) => {
        setFormData((prev) => ({
            ...prev,
            type: uploadType,
            value: url
        }));
        toast.success("PDF uploaded successfully!");
    };

    return (
        <>
            <div className="flex flex-col h-screen bg-white border-e border-gray-100">

                {/* 🔝 Sticky header */}
                <div className="px-4 py-3 border-b bg-gray-50 sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-gray-800">
                        Messages: {selectGroup.groupName}
                    </h2>
                </div>

                {/* 💬 Scrollable messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col-reverse gap-4">
                    <div ref={bottomRef} />

                    {values && values.length > 0 ? (
                        [...values].reverse().map((item, idx) => {
                            const isMe = item.email === profileData.email;

                            return (
                                <div
                                    key={idx}
                                    className={`max-w-xs p-3 rounded-lg shadow ${isMe
                                        ? "ml-auto bg-gray-200 text-gray-800"
                                        : "mr-auto bg-blue-500 text-white"
                                        }`}
                                >
                                    {item.type === "text" && item.value}

                                    {item.type === "pdf" && (
                                        <div className="flex justify-center w-full">
                                            <a
                                                href={item.value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block text-black hover:underline transition duration-200 font-medium"
                                            >
                                                A Document
                                            </a>
                                        </div>
                                    )}

                                    {item.type === "image" && (
                                        <div className="flex justify-center w-full">
                                            <img
                                                src={item.value}
                                                alt="Uploaded Image"
                                                className="w-24 h-24 rounded object-cover border-2 border-indigo-500 shadow-md"
                                            />
                                        </div>
                                    )}

                                </div>

                            );
                        })
                    ) : (
                        <div className="text-center text-gray-400">No messages yet</div>
                    )}
                </div>


                <div className="p-4 border-t bg-white sticky bottom-0 z-10 flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-blue-500">
                        <FiImage
                            size={20}
                            onClick={() => {
                                setUploadType("image");
                                setIsOpen(true);
                            }}
                            className="cursor-pointer text-gray-600"
                        />
                    </button>

                    <button className="p-2 text-gray-500 hover:text-blue-500">
                        <FaFileAlt
                            size={20}
                            onClick={() => {
                                setUploadType("pdf");
                                setIsOpen(true);
                            }}
                            className="cursor-pointer text-gray-600"
                        />
                    </button>

                    <input
                        type="text"
                        id="value"
                        value={formData.value}
                        onChange={handleChange}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <button onClick={handleSubmit} className="p-2 text-blue-500 hover:text-blue-700">
                        <FiSend size={20} />
                    </button>
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

                            <h2 className="text-2xl font-semibold mb-4">File Upload</h2>

                            <div className="w-full px-2 mb-4">
                                {uploadType == "image" && (
                                    <Cloudinary
                                        type="file"
                                        onUpload={handleImageUpload}
                                        acceptedType="image/jpeg,image/png"
                                        label="Upload Image"
                                        required
                                    />
                                )}

                                {uploadType == "pdf" && (
                                    <Cloudinary
                                        type="file"
                                        onUpload={handlePdfUpload}
                                        acceptedType="application/pdf"
                                        label="Upload PDF"
                                        required
                                    />
                                )}
                            </div>

                            <button
                                className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500"
                                onClick={(e) => {
                                    setUploadType(null);
                                    handleSubmit(e);
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}

                <ToastContainer />
            </div>

        </>
    )
}