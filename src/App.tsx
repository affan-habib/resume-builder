// ResumeEditor.tsx

import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

// Define TypeScript Types

interface PersonalDetails {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  profilePicture: string;
  summary: string;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

interface Skill {
  id: number;
  name: string;
  proficiency: string;
}

interface Resume {
  personalDetails: PersonalDetails;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

// ResumeEditor Component

export default function ResumeEditor() {
  // Initial Resume State
  const initialResume: Resume = {
    personalDetails: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      profilePicture:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
  };

  // Placeholders for Editable Fields
  const placeholders = {
    fullName: 'John Doe',
    title: 'Professional Title',
    summary: 'A concise summary about your professional background and skills.',
  };

  // Component State
  const [resume, setResume] = useState<Resume>(initialResume);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Event Handlers

  // Handle Click to Enable Editing
  const handleEdit = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.hasAttribute('contenteditable')) {
      setIsEditing(true);
      target.focus();
    }
  };

  // Handle Save Action
  const handleSave = () => {
    setIsEditing(false);
  };

  // Handle Key Down Events (e.g., Enter Key)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  // Handle Focus Out to Save Changes
  const handleFocusOut = (e: React.FocusEvent<HTMLElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget?.hasAttribute('contenteditable')) {
      handleSave();
      // Update the resume state with the new content
      const field = e.target.getAttribute('data-field');
      if (field) {
        setResume((prev) => ({
          ...prev,
          personalDetails: {
            ...prev.personalDetails,
            [field]: e.target.textContent || '',
          },
        }));
      }
    }
  };

  // Handle Image Upload for Profile Picture
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResume((prev) => ({
          ...prev,
          personalDetails: {
            ...prev.personalDetails,
            profilePicture: event.target?.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <h2 className="text-base font-medium text-gray-900">Resume Editor</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-8 px-4">
        <div className="max-w-[21cm] mx-auto bg-white aspect-[1/1.4142] border border-gray-200">
          <div className="p-8">
            <div className="flex items-start gap-6">
              {/* Profile Picture Section */}
              <div className="relative group">
                <img
                  src={resume.personalDetails.profilePicture}
                  alt={resume.personalDetails.fullName || 'Profile'}
                  className="w-16 h-16 rounded-full object-cover border border-gray-200"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-white border border-gray-200 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Upload Profile Picture"
                >
                  <Upload size={12} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Personal Details Section */}
              <div className="flex-1" onClick={handleEdit}>
                <div className="space-y-1">
                  {/* Full Name */}
                  <h1
                    contentEditable
                    suppressContentEditableWarning
                    onKeyDown={handleKeyDown}
                    onBlur={handleFocusOut}
                    data-field="fullName"
                    className="text-base font-medium text-gray-900 focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
                    data-placeholder={placeholders.fullName}
                  >
                    {resume.personalDetails.fullName}
                  </h1>

                  {/* Title */}
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onKeyDown={handleKeyDown}
                    onBlur={handleFocusOut}
                    data-field="title"
                    className="text-sm text-gray-600 focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
                    data-placeholder={placeholders.title}
                  >
                    {resume.personalDetails.title}
                  </p>

                  {/* Summary Section */}
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onKeyDown={handleKeyDown}
                    onBlur={handleFocusOut}
                    data-field="summary"
                    className="mt-2 text-sm text-gray-700 focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
                    data-placeholder={placeholders.summary}
                  >
                    {resume.personalDetails.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Sections (Experience, Education, Skills) */}
            {/* You can implement these sections similarly by defining editable fields and handling their state updates */}
          </div>
        </div>
      </div>
    </div>
  );
}
