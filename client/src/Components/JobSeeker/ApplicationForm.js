import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cloudinary from "../../Helpers/Cloudinary";
import { ToastContainer, toast } from 'react-toastify';


function ApplicationForm({values}) {
    console.log(values.jobRefId);

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        imageUrl: "",
        document: "",
        pdfUrl: "",
        yourSelf: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/submitForm',
                {
                    jobRefId: values.jobRefId,
                    imageUrl: formData.imageUrl,
                    document: formData.document,
                    pdfUrl: formData.pdfUrl,
                    yourSelf: formData.yourSelf,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            console.log(response.data);
            if (response.data.message === "application submitted") {
                toast.success("Application Submitted Successfully");
            }
            else if (response.data === "application already submitted") {
                toast.error("Application Already Submitted");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleImageUpload = (url) => {
        setFormData((prev) => ({ ...prev, imageUrl: url }));
        toast.success("Image uploaded successfully!");
        console.log(formData.imageUrl);
    };

    const handlePdfUpload = (url) => {
        setFormData((prev) => ({ ...prev, pdfUrl: url }));
        toast.success("PDF uploaded successfully!");
    };


    return (
        <>
            <div className="flex justify-center p-4 rounded border border-gray-300 shadow-sm">

                <div className="flex flex-wrap w-full">
                    <div className="w-full px-2 mb-4">

                        {formData.imageUrl &&
                            <div className="flex justify-center w-full">
                                <img
                                    src={formData.imageUrl}
                                    alt="Profile Picture"
                                    className="w-24 h-24 rounded object-cover border-2 border-indigo-500 shadow-md"
                                />
                            </div>
                        }
                        <Cloudinary
                            type="file"
                            onUpload={handleImageUpload}
                            acceptedType="image/jpeg,image/png"
                            label="Upload Profile Image"
                            required
                        />
                    </div>

                    <div className="w-full px-2 mb-4">
                        <label htmlFor="document" classdocument="block mb-1">
                            Any Relevant Document
                        </label>
                        <input
                            type="text"
                            id="document"
                            value={formData.document}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="w-full px-2 mb-4">
                        <Cloudinary
                            type="file"
                            onUpload={handlePdfUpload}
                            acceptedType="application/pdf"
                            label="Upload Resume (PDF)"
                            className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="w-full px-2 mb-4">
                        <label htmlFor="yourSelf" className="block mb-1">
                            Tell us About you
                        </label>

                        <textarea
                            className="w-full border p-2 rounded mb-3"
                            rows={4}
                            id="yourSelf"
                            value={formData.yourSelf}
                            onChange={handleChange}
                            placeholder="Type your question..."
                        />
                    </div>

                    <div className="flex justify-center w-full">
                        <button
                            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500"
                            onClick={() => setIsOpen(true)}
                        >
                            Update Profile
                        </button>
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

                            <h3 className="text-2xl font-semibold mb-4">
                                Are you Sure want to Submit ?
                            </h3>

                            <div className="flex justify-center w-full">
                                <button
                                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500"
                                    onClick={handleSubmit}
                                >
                                    Save Changes
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

export default ApplicationForm;