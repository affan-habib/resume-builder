import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2, Code2, Briefcase, Trophy } from "lucide-react";

function AiResume() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [apiKey, setApiKey] = useState("AIzaSyA8JbX5wrqSVySYphmM-2zvxrye8exioQY");
  const [customPrompt, setCustomPrompt] = useState("");

  const cleanJsonResponse = (text: string) => {
    return text.replace(/```json\n?|\n?```/g, "").trim();
  };

  const generateContent = async (basePrompt: string) => {
    if (!apiKey) {
      alert("Please enter your Gemini API key first");
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const combinedPrompt = customPrompt
        ? `${basePrompt}\n\nCustom Reference: ${customPrompt}`
        : basePrompt;

      const result = await model.generateContent(combinedPrompt);
      const response = await result.response;
      const text = cleanJsonResponse(response.text());

      try {
        const jsonData = JSON.parse(text);
        setResult(jsonData);
      } catch (e) {
        setResult(text);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating content. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const prompts = {
    skills: "Generate a JSON array of 5 programming skills with name and percentage. Format: [{name: string, percentage: number}]",
    career: "Generate a JSON career summary with summary, highlights, and yearsOfExperience fields.",
    projects: "Generate a JSON array of 3 software development projects with title, description, technologies, role, and achievements fields.",
  };

  const renderResult = () => {
    if (!result) return null;

    if (typeof result === "object") {
      return (
        <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      );
    }

    return (
      <div className="bg-gray-50 p-4 rounded-md">
        <p>{result}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">JSON Generator with Gemini AI</h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your Gemini API key"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <button
              onClick={() => generateContent(prompts.skills)}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              <Code2 size={20} />
              Generate Skills
            </button>
            <button
              onClick={() => generateContent(prompts.career)}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              <Briefcase size={20} />
              Generate Career
            </button>
            <button
              onClick={() => generateContent(prompts.projects)}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              disabled={loading}
            >
              <Trophy size={20} />
              Generate Projects
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Prompt Reference
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Add custom context or additional requirements..."
            />
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin" size={32} />
          </div>
        )}

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Generated Content</h2>
            {renderResult()}
          </div>
        )}
      </div>
    </div>
  );
}

export default AiResume;
