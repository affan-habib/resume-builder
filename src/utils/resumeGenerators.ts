import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ResumeState } from '@/types/resume';

const prompts: Record<keyof ResumeState, string> = {
  personalInformation:
    "Generate a JSON structure for personal information following this strict format: { name: string, title: string, contact: { email: string, phone: string, address: string, linkedin: string, github: string, portfolio: string }, summary: string, profilePicture: string }",
  workExperience:
    "Generate a JSON array of work experiences with strict format: [{ jobTitle: string, company: string, location: string, startDate: string, endDate: string, responsibilities: string[] }]",
  education:
    "Generate a JSON array of educational qualifications with strict format: [{ degree: string, institution: string, startDate: string, endDate: string, gpa: string }]",
  skills:
    "Generate a JSON array of skills with strict format: [{ name: string, proficiency: number }]",
  certifications:
    "Generate a JSON array of certifications with strict format: [{ name: string, issuer: string, startDate: string, endDate: string }]",
  projects:
    "Generate a JSON array of projects with strict format: [{ name: string, keyPoints: string[], technologies: string[], repositoryLink: string, liveDemoLink: string, role: string, startDate: string, endDate: string }]",
  languages:
    "Generate a JSON array of languages with strict format: [{ language: string, proficiency: string }]",
  awards:
    "Generate a JSON array of awards with strict format: [{ title: string, issuer: string, date: string, description: string }]",
  volunteerExperience:
    "Generate a JSON array of volunteer experiences with strict format: [{ role: string, organization: string, location: string, startDate: string, endDate: string, responsibilities: string[] }]",
  references:
    "Generate a JSON array of references with strict format: [{ name: string, jobTitle: string, company: string, email: string, phone: string, relationship: string }]",
  achievements:
    "Generate a JSON array of achievements with strict format: [{ title: string, description: string }]",
  interests:
    "Generate a JSON array of interests with string values"
};

const cleanJsonResponse = (text: string): string => {
  return text.replace(/```json\n?|\n?```/g, "").trim();
};

export type SectionKey = keyof typeof prompts;

export interface GenerateContentResult {
  data: any;
  loading: boolean;
  error?: string;
}

export const generateResumeContent = async (
  sectionKey: SectionKey,
  customInput: string = ""
): Promise<GenerateContentResult> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return {
      data: null,
      loading: false,
      error: "API key is missing"
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const basePrompt = prompts[sectionKey];
    const combinedPrompt = customInput
      ? `${basePrompt}\n\nCustom Enhancement: ${customInput}`
      : basePrompt;

    const result = await model.generateContent(combinedPrompt);
    const response = await result.response;
    const text = cleanJsonResponse(response.text());

    try {
      const jsonData = JSON.parse(text);
      return {
        data: jsonData,
        loading: false
      };
    } catch (e) {
      return {
        data: text,
        loading: false,
        error: "Failed to parse JSON response"
      };
    }
  } catch (error) {
    return {
      data: null,
      loading: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};

export const getDisplayName = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};