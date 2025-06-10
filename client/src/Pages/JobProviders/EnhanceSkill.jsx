import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/JobProvider/Navbar";
import SelectButton from "../../Components/SelectButton";
import { ToastContainer, toast } from 'react-toastify';
import Analysis from "../../Components/Analysis";

function EnhanceSkill() {

    const [score, setScore] = useState([])
    const [values, setValues] = useState([])

    const [formData, setFormData] = useState({
        domain_expertise: '',
        communication_skill: '',
        collaboration: '',
        time_management: '',
        cultural_fit: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict/jobProviders',
                {
                    domain_expertise: formData.domain_expertise,
                    communication_skill: formData.communication_skill,
                    collaboration: formData.collaboration,
                    time_management: formData.time_management,
                    cultural_fit: formData.cultural_fit,
                },
            );
            console.log(response.data);
            setScore(response.data);
            setValues(response.data.recommendation[0]);

        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="pt-8 sm:pt--6 lg:pt-10">
                <Navbar />

                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-4 lg:px-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">

                            <div>
                                <div className="flex flex-col items-center p-2 gap-y-2">
                                    <h3 className="text-xl font-bold text-gray-900 sm:text-3xl">
                                        Enhance
                                        <strong className="text-indigo-600"> Your </strong>
                                        Skill
                                    </h3>

                                    <SelectButton
                                        label="Domain Expertise"
                                        id="domain_expertise"
                                        handleChange={handleChange}
                                        value={formData.domain_expertise}
                                    />

                                    <SelectButton
                                        label="Communication Skill"
                                        id="communication_skill"
                                        handleChange={handleChange}
                                        value={formData.communication_skill}
                                    />

                                    <SelectButton
                                        label="Collaboration in WorkSpace"
                                        id="collaboration"
                                        handleChange={handleChange}
                                        value={formData.collaboration}
                                    />

                                    <SelectButton
                                        label="Time Management"
                                        id="time_management"
                                        handleChange={handleChange}
                                        value={formData.time_management}
                                    />

                                    <SelectButton
                                        label="Cultural Fit"
                                        id="cultural_fit"
                                        handleChange={handleChange}
                                        value={formData.cultural_fit}
                                    />

                                    <button
                                        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500"
                                        onClick={handleSubmit}
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-col items-center p-2 gap-y-2">

                                    <Analysis
                                        score={score}
                                        values={values}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ToastContainer />
            </div>
        </>
    )
}

export default EnhanceSkill;