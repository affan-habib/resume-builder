import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2 } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [apiKey, setApiKey] = useState("");
  const [customInput, setCustomInput] = useState("");

  const prompts = {
    personalInformation: "Generate a JSON structure for personal information including name, title, contact details, and summary. Follow this strict format: { name: string, title: string, contact: { email: string, phone: string, address: string, linkedin: string, github: string, portfolio: string }, summary: string }.",
    workExperience: "Generate a JSON array of work experiences with strict format: [{ jobTitle: string, company: string, location: string, startDate: string, endDate: string, responsibilities: string[], achievements: string[] }].",
    education: "Generate a JSON array of educational qualifications with strict format: [{ degree: string, institution: string, startDate: string, endDate: string, gpa: string }].",
    skills: "Generate a JSON array of skills with strict format: [{ name: string, proficiency: number }].",
    certifications: "Generate a JSON array of certifications with strict format: [{ name: string, issuer: string, startDate: string, endDate: string }].",
    projects: "Generate a JSON array of projects with strict format: [{ name: string, description: string, technologies: string[], role: string, repositoryLink: string, liveDemoLink: string, startDate: string, endDate: string }].",
    languages: "Generate a JSON array of languages with strict format: [{ language: string, proficiency: string }].",
    awards: "Generate a JSON array of awards with strict format: [{ title: string, issuer: string, date: string, description: string }].",
    volunteerExperience: "Generate a JSON array of volunteer experiences with strict format: [{ role: string, organization: string, location: string, startDate: string, endDate: string, responsibilities: string[] }].",
    references: "Generate a JSON array of references with strict format: [{ name: string, jobTitle: string, company: string, email: string, phone: string, relationship: string }].",
    fullResume: "Generate a full resume JSON following this strict structure: { personalInformation: {...}, workExperience: [...], education: [...], skills: [...], certifications: [...], projects: [...], languages: [...], awards: [...], volunteerExperience: [...], references: [...] }.",
  };

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

      const combinedPrompt = customInput
        ? `${basePrompt}\n\nCustom Enhancement: ${customInput}`
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
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Resume JSON Generator</h1>

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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Enhancement Input
            </label>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Add additional context or requirements for generating content..."
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.entries(prompts).map(([key, prompt]) => (
              <button
                key={key}
                onClick={() => generateContent(prompt)}
                className={`bg-${key === "fullResume" ? "green" : "blue"}-600 text-white px-4 py-2 rounded-md hover:bg-${key === "fullResume" ? "green" : "blue"}-700 transition-colors text-center`}
                disabled={loading}
              >
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </button>
            ))}
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

export default App;
