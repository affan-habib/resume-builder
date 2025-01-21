import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ResumeJsonGeneratorProps {
  buttonKey: string; // Specifies which button's functionality to show
  setData: (data: any) => void; // Callback to pass generated data back to the parent
  setLoading: (loading: boolean) => void; // Callback to update the loading state in the parent
}

const ResumeJsonGenerator: React.FC<ResumeJsonGeneratorProps> = ({
  buttonKey,
  setData,
  setLoading,
}) => {
  const [customInput, setCustomInput] = useState<string>("");
  const [activeInput, setActiveInput] = useState<boolean>(false);

  const apiKey: string = import.meta.env.VITE_GEMINI_API_KEY || "";

  const prompts: Record<string, string> = {
    personalInformation:
      "Generate a JSON structure for personal information including name, title, contact details, summary and profile picture. Follow this strict format: { name: string, title: string, contact: { email: string, phone: string, address: string, linkedin: string, github: string, portfolio: string }, summary: string, profilePicture: string }.",
    workExperience:
      "Generate a JSON array of work experiences with strict format: [{ jobTitle: string, company: string, location: string, startDate: string, endDate: string, responsibilities: string[] }].",
    education:
      "Generate a JSON array of educational qualifications with strict format: [{ degree: string, institution: string, startDate: string, endDate: string, gpa: string }].",
    skills:
      "Generate a JSON array of skills with strict format: [{ name: string, proficiency: number }].",
    certifications:
      "Generate a JSON array of certifications with strict format: [{ name: string, issuer: string, startDate: string, endDate: string }].",
    projects:
      "Generate a JSON array of projects with strict format: [{ name: string, keyPoints: string[], technologies: string[], repositoryLink: string, liveDemoLink: string, role: string, startDate: string, endDate: string }].",
    languages:
      "Generate a JSON array of languages with strict format: [{ language: string, proficiency: string }].",
    awards:
      "Generate a JSON array of awards with strict format: [{ title: string, issuer: string, date: string, description: string }].",
    volunteerExperience:
      "Generate a JSON array of volunteer experiences with strict format: [{ role: string, organization: string, location: string, startDate: string, endDate: string, responsibilities: string[] }].",
    references:
      "Generate a JSON array of references with strict format: [{ name: string, jobTitle: string, company: string, email: string, phone: string, relationship: string }].",
    achievements:
      "Generate a JSON array of achievements with strict format: [{ title: string, description: string }].",
    fullResume:
      "Generate a full resume JSON following this strict structure: { personalInformation: {...}, workExperience: [...], education: [...], skills: [...], certifications: [...], projects: [...], languages: [...], awards: [...], volunteerExperience: [...], references: [...], achievements: [...], interests: string[] }.",
  };

  const cleanJsonResponse = (text: string): string => {
    return text.replace(/```json\n?|\n?```/g, "").trim();
  };

  const generateContent = async (): Promise<void> => {
    if (!apiKey) {
      alert("Please enter your Gemini API key first");
      return;
    }

    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const basePrompt = prompts[buttonKey];
      const combinedPrompt = customInput
        ? `${basePrompt}\n\nCustom Enhancement: ${customInput}`
        : basePrompt;

      const result = await model.generateContent(combinedPrompt);
      const response = await result.response;
      const text = cleanJsonResponse(response.text());

      try {
        const jsonData = JSON.parse(text);
        setData(jsonData); // Pass the generated JSON data to the parent
      } catch (e) {
        setData(text); // Pass raw text to parent if JSON parsing fails
      }
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Error generating content. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Resume JSON Generator</h1>
      <div className="space-y-2">
        <button
          onClick={() => setActiveInput((prev) => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
        >
          {buttonKey
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </button>

        {activeInput && (
          <div className="space-y-2 mt-2">
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Add additional context or requirements..."
            />
            <button
              onClick={generateContent}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeJsonGenerator;
