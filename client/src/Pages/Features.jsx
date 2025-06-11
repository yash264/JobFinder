import React from "react";
import Header from '../Components/Header';

function Features() {

    return (
        <>

            <div className="min-h-screen bg-gray-900 text-white">
                <Header />

                <header className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-screen">
                    <div className="bg-gray-900 text-white px-6 py-12">

                        <h4 className="text-2xl text-center font-bold mb-4">
                            FEATURES
                        </h4>

                        <div className="max-w-6xl mx-auto text-center">
                            <ul className="text-left max-w-2xl mx-auto list-disc list-inside space-y-2 text-base">
                                <li>Build a dynamic web application facilitating real-time form submission.</li>
                                <li>Allow users to attach & upload documents securely.</li>
                                <li>Implement JWT tokens to ensure user privacy and security.</li>
                                <li>Auto-generate email notifications with a clean visual system.</li>
                            </ul>
                        </div>

                        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div>
                                <h5 className="text-xl font-semibold mb-4 text-center md:text-left">ADMIN</h5>
                                <ul className="space-y-2 text-base">
                                    <li>1. Admin can create a job by providing specified details.</li>
                                    <li>2. View a candidate list for each created role.</li>
                                    <li>3. Accept or reject applications based on requirements.</li>
                                </ul>
                            </div>

                            <div>
                                <h5 className="text-xl font-semibold mb-4 text-center md:text-left">JOB FINDERS</h5>
                                <ul className="space-y-2 text-base">
                                    <li>1. Users can register as candidates and log in.</li>
                                    <li>2. After updating their profile, they can apply to available jobs.</li>
                                    <li>3. During registration, users can upload required documents.</li>
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