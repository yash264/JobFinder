import React, { useState } from "react";
import axios from "axios";
import { TextGenerate } from "./TextGenerate";

function ChatBot() {

    const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const formatApiResponse = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '$1')      
            .replace(/^\* /gm, '• ')             
            .replace(/\n\s*\n/g, '\n')            
            .replace(/^(.*):$/gm, '\n\n$1:\n')    
    };


    const modifiedQuery = `Please provide a detailed explanation of ${query} in approximately 200-300 words.`;

    axios.defaults.withCredentials = false;
    
    const handleSubmit = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const result = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
?key=${GEMINI_API_KEY}`,
                {
                    contents: [{ parts: [{ text: modifiedQuery }] }]
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const generatedText = result.data.candidates[0]?.content?.parts[0]?.text || "No response.";
            const formatted = formatApiResponse(generatedText);
            setResponse(formatted);

        } catch (error) {
            console.error(error);
        }
        setQuery("");
        setLoading(false);
    };

    return (
        <>
            <button
                className="fixed bottom-5 right-5 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700"
                onClick={() => setIsOpen(true)}
            >
                Need Help
            </button>


            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center px-4">
                    <div className="bg-white text-center rounded-lg shadow-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto relative mt-20 p-6">

                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            ✖
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Need Help from our AI Assistant.</h2>


                        {response && !loading && (
                            <div className="mb-6 whitespace-pre-line text-base leading-relaxed text-gray-800 border p-3 rounded bg-gray-50">
                                <strong>Response:</strong>
                                <div className="mt-2">
                                    <TextGenerate words={response} />
                                </div>
                            </div>
                        )}


                        {loading && (
                            <div class="flex justify-center items-center my-4 space-x-2">
                                <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                                <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        )}


                        <textarea
                            className="w-full border p-2 rounded mb-3"
                            rows={4}
                            placeholder="Type your question..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={loading}
                        />


                        <button
                            onClick={handleSubmit}
                            disabled={loading || !query.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {loading ? "Generating..." : "Search"}
                        </button>

                    </div>
                </div>
            )}

        </>
    )
}

export default ChatBot;
