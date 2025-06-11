import React from "react";

export default function SelectButton({ label, id, handleChange, value }) {
    return (
        <>
            <div className="relative mt-6 w-full max-w-sm">
                <select
                    id={id}
                    value={value}
                    onChange={handleChange}
                    className="peer block w-full rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    defaultValue=""
                >

                    <option >Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                    <option value="6">Six</option>
                    <option value="7">Seven</option>
                    <option value="8">Eight</option>
                    <option value="9">Nine</option>
                    <option value="10">Ten</option>
                </select>

                <label
                    htmlFor="Headline"
                    className="absolute left-3 top-2 z-10 px-1 text-sm text-gray-500 
               transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-blue-600 
               peer-valid:-top-3.5 peer-valid:text-xs peer-valid:text-gray-700 
               bg-white"
                >
                    {label}
                </label>
            </div>

        </>
    )
}