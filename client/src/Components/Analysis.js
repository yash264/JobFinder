import React from "react";

export default function Analysis({ score, values }) {

    if (!score || score.performance_scores == null) {
        return (
            <div className="text-center text-gray-500 text-lg font-medium p-4">
                No analysis available
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