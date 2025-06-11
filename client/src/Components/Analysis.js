import React from "react";

export default function Analysis({ score, values }) {

    if (!score || score.performance_scores == null) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700 max-w-3xl mx-auto m-4">
                <h2 className="text-2xl text-center font-bold text-gray-800 mb-2">
                    AI-Powered Insights
                </h2>
                <p className="text-sm p-2 leading-relaxed text-gray-600">
                    Our machine learning engine evaluates your core skills — from technical ability to leadership — and calculates a job readiness score that reflects your real-world potential.
                </p>
                <p className="text-sm p-2 leading-relaxed text-gray-600">
                    It doesn’t stop there. You'll get targeted recommendations to improve, grow, and stand out in today’s job market.
                </p>
            </div>
        );
    }

    const percentage = parseFloat(score.performance_scores).toFixed(1);
    const size = 120, strokeWidth = 12;

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <>
            <div className="">

                <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Detailed
                    <strong className="text-indigo-600"> Analysis </strong>
                    & Recommendation
                </h3>

                <div className="flex flex-col items-center relative inline-block p-4">
                    <svg width={size} height={size} className="transform -rotate-90">
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            strokeWidth={strokeWidth}
                            stroke="#e5e7eb"
                            fill="transparent"
                        />

                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            stroke="#3b82f6"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                        />
                    </svg>

                    <div
                        className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-700"
                    >
                        {percentage}%
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 p-2">
                    <strong className="text-yellow-600"> Suggestion: </strong>
                    {values.suggest}
                </h3>

                <h3 className="text-xl font-bold text-gray-900 p-2">
                    <strong className="text-yellow-600"> Motivation: </strong>
                    {values.motivate}
                </h3>

            </div>
        </>
    )
}