import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ChevronDown, Type, Mic, MicOff } from 'lucide-react';
import {
  updatePersonalInfo,
  updateWorkExperience,
  updateEducation,
  updateSkills,
  updateCertifications,
  updateProjects,
  updateLanguages,
  updateAwards,
  updateVolunteerExperience,
  updateReferences,
  updateAchievements,
  updateInterests,
} from '@/store/slices/resumeSlice';
import { setSectionLoading } from '@/store/slices/loadingSlice';
import {
  generateResumeContent,
  getDisplayName,
  type SectionKey,
} from '@/utils/resumeGenerators';
import type { ResumeState } from '@/types/resume';

type ActionMap = {
  [K in keyof ResumeState]: (data: ResumeState[K]) => void;
};

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedSection, setSelectedSection] = useState<SectionKey | ''>('');
  const [customInput, setCustomInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const actions: ActionMap = {
    personalInformation: (data) => dispatch(updatePersonalInfo(data)),
    workExperience: (data) => dispatch(updateWorkExperience(data)),
    education: (data) => dispatch(updateEducation(data)),
    skills: (data) => dispatch(updateSkills(data)),
    certifications: (data) => dispatch(updateCertifications(data)),
    projects: (data) => dispatch(updateProjects(data)),
    languages: (data) => dispatch(updateLanguages(data)),
    awards: (data) => dispatch(updateAwards(data)),
    volunteerExperience: (data) => dispatch(updateVolunteerExperience(data)),
    references: (data) => dispatch(updateReferences(data)),
    achievements: (data) => dispatch(updateAchievements(data)),
    interests: (data) => dispatch(updateInterests(data)),
  };

  const sections = Object.keys(actions) as SectionKey[];

  // Example custom prompts for each section
  const customPrompts: Record<SectionKey, string[]> = {
    personalInformation: [
      'Write a brief introduction about myself including my name and location.',
      'Add a personal branding statement for a software engineer.',
      'Include a professional summary focusing on client-facing skills.',
    ],
    workExperience: [
      'Summarize my experience in 3 companies: Google, Amazon, and Microsoft.',
      'Highlight leadership roles and achievements in previous positions.',
      'Focus on remote freelance projects with React and Node.js.',
    ],
    education: [
      'Explain my BSc in Computer Science with top achievements.',
      'Emphasize any relevant coursework or extracurricular activities.',
      'Mention any coding bootcamps or specialized training completed.',
    ],
    skills: [
      'List 5 front-end development skills for a fresher with React knowledge.',
      'Mention advanced cloud skills (AWS, Docker, Kubernetes).',
      'Focus on collaboration and communication skills for a cross-functional team.',
    ],
    certifications: [
      'Detail AWS Certified Solutions Architect achievements.',
      'Highlight any Project Management Professional (PMP) certification.',
      'Include Google Cloud or Azure certificates with key highlights.',
    ],
    projects: [
      'Describe an e-commerce web app built using React and Node.js.',
      'Mention an AI-driven chatbot project with NLP capabilities.',
      'Highlight a personal portfolio site that focuses on design and UX.',
    ],
    languages: [
      'List fluent languages with proficiency levels (English - native, Spanish - intermediate).',
      'Mention any official tests (IELTS, TOEFL) with scores.',
      'Include any specialized or regional dialect knowledge.',
    ],
    awards: [
      'List local hackathon wins and coding competition placements.',
      'Mention outstanding employee or volunteer awards.',
      'Include any academic honors or scholarships.',
    ],
    volunteerExperience: [
      'Describe community service in a local coding club.',
      'Mention volunteer teaching roles for underprivileged students.',
      'Highlight any mentor or organizer roles in non-profit events.',
    ],
    references: [
      'Add references from previous manager at Google and coworker from Amazon.',
      'Mention project mentors who can vouch for my technical skills.',
      'Include references from a professor or academic advisor.',
    ],
    achievements: [
      'Focus on significant career milestones (promotions, major project successes).',
      'Highlight achievements in setting up new departments or teams.',
      'Mention any public speaking or conference achievements.',
    ],
    interests: [
      'List relevant hobbies (open-source contributions, design, blogging).',
      'Mention sports or team-based activities that showcase leadership.',
      'Include creative pursuits like photography or music.',
    ],
  };

  const handleSectionSelect = (key: SectionKey) => {
    setSelectedSection(key);
    setShowDropdown(false);
    setCustomInput('');
  };

  const handlePromptClick = (prompt: string) => {
    // Append or replace custom input with the selected prompt
    setCustomInput((prev) => (prev ? `${prev}\n${prompt}` : prompt));
  };

  const handleGenerate = async () => {
    if (!selectedSection) return;
    dispatch(setSectionLoading({ section: selectedSection, isLoading: true }));
    const result = await generateResumeContent(selectedSection, customInput);
    dispatch(setSectionLoading({ section: selectedSection, isLoading: false }));

    if (result.error) {
      alert(result.error);
      return;
    }
    if (result.data) {
      actions[selectedSection](result.data);
      setCustomInput('');
    }
  };

  // Voice to text
  const toggleRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    if (!recognitionRef.current) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setCustomInput((prev) => (prev ? `${prev}\n${transcript}` : transcript));
      };
    }

    if (!isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="w-80 bg-white shadow-lg h-screen overflow-y-auto fixed left-0 top-16 p-4">
      <h2 className="text-xl font-bold mb-4">Generate Resume Sections</h2>

      {/* Section Dropdown */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="flex items-center gap-2">
            <Type size={16} />
            <span>
              {selectedSection ? getDisplayName(selectedSection) : 'Select a section'}
            </span>
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              showDropdown ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {showDropdown && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {sections.map((key) => (
              <li
                key={key}
                onClick={() => handleSectionSelect(key)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  selectedSection === key ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                {getDisplayName(key)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dynamic prompts for the selected section */}
      {selectedSection && (
        <div className="space-y-3">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-2 text-sm text-gray-700">
            <p className="font-semibold mb-2">Quick Prompts:</p>
            <ul className="space-y-2">
              {customPrompts[selectedSection].map((prompt, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handlePromptClick(prompt)}
                    className="text-blue-600 hover:underline"
                  >
                    {prompt}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Custom Input + Voice to Text */}
          <div className="relative">
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Add custom requirements or context..."
              className="w-full p-2 text-sm border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={toggleRecording}
              className="absolute bottom-2 right-2 p-2 bg-blue-100 rounded-full hover:bg-blue-200 text-blue-700"
              aria-label="Voice Input"
            >
              {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Content
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
