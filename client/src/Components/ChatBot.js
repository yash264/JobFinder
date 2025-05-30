import React, { useState } from "react";
import axios from "axios";

function ChatBot() {

    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const formatApiResponse = (text) => {
        return text
          .replace(/\*\*(.*?)\*\*/g, '$1')      // Remove bold markdown (**text** → text)
          .replace(/^\* /gm, '• ')              // Bullet points: * Item → • Item
          .replace(/\n\s*\n/g, '\n')            // Remove excess newlines
          .replace(/^(.*):$/gm, '\n\n$1:\n')    // Section headers on new lines
      };

    const GEMINI_API_KEY = 'AIzaSyApvtZ1IICEEMhbrCoXsKOX9oR-8WQkLX8'; // Replace this with your actual key

    const handleSubmit = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const result = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
?key=${GEMINI_API_KEY}`,
                {
                    contents: [{ parts: [{ text: query }] }]
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
            console.error("Gemini API error:", error);
            setResponse("Something went wrong. Check the console.");
        }
        setLoading(false);
    };

    return (
        <>
            <h1>Search</h1>
            <div className="max-w-xl mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-4">Ask Gemini</h2>
                <textarea
                    className="w-full border p-2 rounded"
                    rows={4}
                    placeholder="Type your question..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                    {loading ? "Generating..." : "Generate Response"}
                </button>

                {response && (
                    <div className="whitespace-pre-line text-base leading-relaxed text-gray-800 p-4">
                        <strong>Response:</strong>
                        <p>{response}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ChatBot;