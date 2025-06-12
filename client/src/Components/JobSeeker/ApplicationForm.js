import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cloudinary from "../../Helpers/Cloudinary";
import { ToastContainer, toast } from 'react-toastify';


function ApplicationForm({ values }) {
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

    axios.defaults.withCredentials = true;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://jobfinderserver.onrender.com/api/submitForm',
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

        setLoading(false);
        setIsOpen(false);
    }

    const handleImageUpload = (url) => {
        setFormData((prev) => ({ ...prev, imageUrl: url }));
        toast.success("Image uploaded successfully!");
    };

    const handlePdfUpload = (url) => {
        setFormData((prev) => ({ ...prev, pdfUrl: url }));
        toast.success("Document uploaded successfully!");
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
                            placeholder="Name of the Document"
                        />
                    </div>

                    <div className="w-full px-2 mb-4">
                        <Cloudinary
                            type="file"
                            onUpload={handlePdfUpload}
                            acceptedType="application/pdf"
                            label="Upload your document"
                            className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="w-full px-2 mb-4">
                        <label htmlFor="yourSelf" className="block mb-1">
                            Tell us about yourSelf
                        </label>

                        <textarea
                            className="w-full border p-2 rounded mb-3"
                            rows={4}
                            id="yourSelf"
                            value={formData.yourSelf}
                            onChange={handleChange}
                            placeholder="Explain your strength..."
                        />
                    </div>

                    <div className="flex justify-center w-full">
                        <button
                            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500"
                            onClick={() => setIsOpen(true)}
                        >
                            Submit
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
                                Are you Sure want to Submit the Application ?
                            </h3>

                            {loading && (
                                <div className="flex justify-center w-full">
                                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-center w-full">
                                <button
                                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500"
                                    onClick={handleSubmit}
                                >
                                    Yes, Submit it.
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