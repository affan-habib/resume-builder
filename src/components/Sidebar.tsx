import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChevronDown, Type } from 'lucide-react';
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
    updateInterests
} from '../resumeSlice';
import { setSectionLoading } from '../loadingSlice';
import { generateResumeContent, getDisplayName, type SectionKey } from '../utils/resumeGenerators';
import type { ResumeState } from '../types/resume';

type ActionMap = {
    [K in keyof ResumeState]: (data: ResumeState[K]) => void;
};

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const [selectedSection, setSelectedSection] = useState<SectionKey | ''>('');
    const [customInput, setCustomInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

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
        interests: (data) => dispatch(updateInterests(data))
    };

    const sections = Object.keys(actions) as SectionKey[];

    const handleSectionSelect = (key: SectionKey) => {
        setSelectedSection(key);
        setShowDropdown(false);
    };

    const handleGenerate = async () => {
        if (!selectedSection) return;

        // Set loading state
        dispatch(setSectionLoading({ section: selectedSection, isLoading: true }));

        const result = await generateResumeContent(selectedSection, customInput);

        // Clear loading state
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
                        <span>{selectedSection ? getDisplayName(selectedSection) : 'Select a section'}</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${showDropdown ? 'transform rotate-180' : ''}`} />
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

            {/* Custom Input */}
            {selectedSection && (
                <div className="space-y-3">
                    <textarea
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Add custom requirements or context..."
                        className="w-full p-2 text-sm border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

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