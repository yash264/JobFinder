import React from "react";
import { useState } from "react";

export default function CLoudinary({ onUpload, acceptedType, label }) {

    const [uploading, setUploading] = useState(false);

    const cloud_name = process.env.REACT_APP_cloud_name;
    const upload_preset = process.env.REACT_APP_upload_preset;


    const handleUpload = async (e) => {
        setUploading(true);

        const file = e.target.files[0];
        if (!file) return;

        const resourceType = file.type === "application/pdf" ? "raw" : "image";
        const url = `https://api.cloudinary.com/v1_1/${cloud_name}/${resourceType}/upload`;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            onUpload(data.secure_url);

        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };


    return (
        <>
            <div className="w-full px-2 mb-4">
                <label htmlFor="pdfUrl" className="block mb-1">
                    {label}
                </label>

                <input
                    type="file"
                    accept={acceptedType}
                    onChange={handleUpload}
                    className="w-full px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />

                {uploading && (
                    <div className="flex justify-center w-full">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
