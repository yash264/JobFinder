import React from "react";
import { useState, useEffect, useRef } from "react";
import { FiSend, FiImage } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import moment from "moment";
import TextareaAutosize from 'react-textarea-autosize';
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
            name: profileData.name || profileData.fermName,
            email: profileData.email,
            type: formData.type,
            value: formData.value,
        });

        setFormData({
            ...formData,
            type: "text",
            value: "",
        });
    };

    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current && (values.length>0)) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [values]);


    useEffect(() => {

        socket.emit("joinGroup", selectGroup);
        socket.emit("getAllMessages", selectGroup);


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
            socket.off("newMessage", handleNewMessage);
        };
    }, [selectGroup, socket]);


    const handleImageUpload = (url) => {
        setFormData((prev) => ({
            ...prev,
            type: uploadType,
            value: url
        }));
        toast.success("Image uploaded successfully!. Now send it.");
    };

    const handlePdfUpload = (url) => {
        setFormData((prev) => ({
            ...prev,
            type: uploadType,
            value: url
        }));
        toast.success("Document uploaded successfully! Now send it.");
    };

    return (
        <>
            <div className="flex flex-col h-screen bg-white border-e border-gray-100">

                <div className="relative px-6 py-5 bg-green-100 text-gray-900 rounded-xl shadow-md border border-green-200 max-w-4xl mx-auto mb-6 transition-transform hover:shadow-lg hover:scale-[1.01]">
                    <div className="absolute -top-4 left-6 bg-white border border-green-300 rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-2M9 20H4v-2a3 3 0 013-3h2m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>

                    <div className="flex flex-col mt-2">
                        <h2 className="text-2xl font-bold text-green-800">
                            Group: <span className="text-indigo-700">{selectGroup.groupName?.toUpperCase()}</span>
                        </h2>
                        <p className="text-sm text-gray-700 mt-2 border-l-4 border-indigo-300 pl-3 italic">
                            {selectGroup.bio}
                        </p>
                    </div>
                </div>



                <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col-reverse gap-4">
                    <div ref={bottomRef} />

                    {values && values.length > 0 ? (
                        [...values].reverse().map((item, idx) => {
                            const isMe = item.email === profileData.email;

                            return (
                                <div
                                    key={idx}
                                    className={`max-w-xs p-3 rounded-lg shadow whitespace-pre-wrap break-words 
                                        ${isMe
                                            ? "ml-auto bg-gray-200 text-gray-800"
                                            : "mr-auto bg-blue-300 text-gray-900"
                                        }`}
                                >
                                    {item.type === "text" && item.value}

                                    {item.type === "pdf" && (
                                        <div className="flex justify-center w-full">
                                            <a
                                                href={item.value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block text-gray-900 hover:underline transition duration-200 font-medium"
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

                                    <details className="mt-2 group text-xs text-gray-600">
                                        <summary className="cursor-pointer select-none">
                                            {isMe ? "You" : item.name}
                                        </summary>

                                        <div className="mt-1 pl-2 space-y-1 text-[11px]">
                                            {!isMe && <p>Email: {item.email}</p>}
                                            <p>Sent: {moment(item.time).format("Do MMM YY, h:mm a")}</p>
                                        </div>
                                    </details>

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

                    <TextareaAutosize
                        id="value"
                        value={formData.value}
                        onChange={handleChange}
                        placeholder="Type a message..."
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <button
                        onClick={handleSubmit}
                        className="p-2 text-blue-500 hover:text-blue-700">
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
                                {uploadType === "image" && (
                                    <Cloudinary
                                        type="file"
                                        onUpload={handleImageUpload}
                                        acceptedType="image/jpeg,image/png"
                                        label="Upload Image"
                                        required
                                    />
                                )}

                                {uploadType === "pdf" && (
                                    <Cloudinary
                                        type="file"
                                        onUpload={handlePdfUpload}
                                        acceptedType="application/pdf"
                                        label="Upload Document"
                                        required
                                    />
                                )}
                            </div>


                            <div className="flex justify-center w-full">
                                <button
                                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
                                    onClick={(e) => {
                                        setUploadType(null);
                                        handleSubmit(e);
                                        setIsOpen(false);
                                    }}
                                >
                                    Send it
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
