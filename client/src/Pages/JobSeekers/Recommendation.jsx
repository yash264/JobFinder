import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/JobSeeker/Navbar";
import SelectButton from "../../Components/SelectButton";
import Analysis from "../../Components/Analysis";


function Recommendation() {
    const [score, setScore] = useState([])
    const [values, setValues] = useState([])
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        techincal_skill: '',
        communication_skill: '',
        problem_solving: '',
        creativity: '',
        leadership: '',
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
            const response = await axios.post('https://jobfinderflaskserver.onrender.com/predict/jobSeekers',
                {
                    techincal_skill: formData.techincal_skill,
                    communication_skill: formData.communication_skill,
                    problem_solving: formData.problem_solving,
                    creativity: formData.creativity,
                    leadership: formData.leadership,
                },
            );

            setScore(response.data);
            setValues(response.data.recommendation[0]);
        }
        catch (error) {
            console.log(error);
        }

        setLoading(false);
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
                                        label="Technical Skill"
                                        id="techincal_skill"
                                        handleChange={handleChange}
                                        value={formData.techincal_skill}
                                    />

                                    <SelectButton
                                        label="Communication Skill"
                                        id="communication_skill"
                                        handleChange={handleChange}
                                        value={formData.communication_skill}
                                    />

                                    <SelectButton
                                        label="Problem Solving"
                                        id="problem_solving"
                                        handleChange={handleChange}
                                        value={formData.problem_solving}
                                    />

                                    <SelectButton
                                        label="Creativity"
                                        id="creativity"
                                        handleChange={handleChange}
                                        value={formData.creativity}
                                    />

                                    <SelectButton
                                        label="LeaderShip"
                                        id="leadership"
                                        handleChange={handleChange}
                                        value={formData.leadership}
                                    />

                                    {loading && (
                                        <div className="flex justify-center w-full">
                                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500"
                                        onClick={handleSubmit}
                                    >
                                        Check Score
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

            </div>
        </>
    )
}

export default Recommendation;