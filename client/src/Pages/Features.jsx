import React from "react";
import Header from '../Components/Header';

function Features() {

    return (
        <>

            <div className="min-h-screen bg-gray-900 text-white">
                <Header />

                <header className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-screen">
                    <div className="bg-gray-800 text-white px-6 py-12">

                        <h4 className="text-2xl text-center font-bold mb-4">
                            FEATURES
                        </h4>

                        <div className="max-w-6xl mx-auto text-center">
                            <ul className="text-left max-w-2xl mx-auto list-disc list-inside space-y-2 text-base">
                                <li>Build a dynamic web application facilitating real-time form submission.</li>
                                <li>Allow users to attach & upload documents securely.</li>
                                <li>Created a section where users can communicate with each other.</li>
                                <li>Implement a feature which suggests users to enhance their skill.</li>
                            </ul>
                        </div>

                        <div className="p-4 max-w-6xl bg-gray-700 mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div>
                                <h5 className="text-xl font-semibold mb-4 text-center md:text-left">JOB PROVIDERS</h5>
                                <ul className="space-y-2 text-base">
                                    <li>1. They can create a job by providing specified details.</li>
                                    <li>2. View the candidates list for each created role.</li>
                                    <li>3. Accept or reject applications based on requirements.</li>
                                </ul>
                            </div>

                            <div>
                                <h5 className="text-xl font-semibold mb-4 text-center md:text-left">JOB FINDERS</h5>
                                <ul className="space-y-2 text-base">
                                    <li>1. They can register as fresh candidates and trach their profile.</li>
                                    <li>2. After updating their profile, they can apply to available jobs.</li>
                                    <li>3. During registration, they can upload required documents.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </header>

            </div >
        </>
    )
}

export default Features;