import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addLanguage, editLanguage, removeLanguage } from '@/store/slices/resumeSlice';
import EditableField from '@/components/common/EditableField';
import SectionWrapper from '@/components/resume/SectionWrapper';

const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'];

const LanguageSection: React.FC = () => {
  const dispatch = useDispatch();
  const title = 'Languages';
  const languages = useSelector((state: RootState) => state.resume.languages);
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title;

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleAddLanguage = () => {
    const newEntry = { language: 'New Language', proficiency: 'Beginner' };
    dispatch(addLanguage(newEntry));
  };

  const handleLanguageChange = (index: number, field: keyof typeof languages[0], value: string) => {
    dispatch(editLanguage({ index, field, value }));
  };

  const handleRemoveLanguage = (index: number) => {
    dispatch(removeLanguage(index));
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddLanguage,
      ariaLabel: 'Add new language',
    },
  ];

  return (
    <SectionWrapper title={title} actions={actions}>
      <div className="space-y-2">
        {languages.map((language, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Editable Language Name */}
            <EditableField
              value={language.language}
              placeholder="Language"
              onSave={(value) => handleLanguageChange(index, 'language', value)}
              className={`bg-transparent text-gray-800 text-sm w-full ${
                isActive ? '' : 'pointer-events-none'
              }`}
            />

            {/* Proficiency Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown((prev) => (prev === index ? null : index));
                }}
                className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded focus:outline-none border border-gray-300"
              >
                {language.proficiency}
              </button>
              {activeDropdown === index && (
                <ul className="absolute mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                  {proficiencyLevels.map((level) => (
                    <li
                      key={level}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageChange(index, 'proficiency', level);
                        setActiveDropdown(null); // Close dropdown
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        level === language.proficiency ? 'font-bold' : ''
                      }`}
                    >
                      {level}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Remove Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveLanguage(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Remove language"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default LanguageSection;
