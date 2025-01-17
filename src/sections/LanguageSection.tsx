import React from 'react';
import { Plus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setActiveSection } from '../activeSectionSlice';

interface LanguageEntry {
  language: string;
  proficiency: string;
}

const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'];

const LanguageSection: React.FC = () => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);

  const [languages, setLanguages] = React.useState<LanguageEntry[]>([
    { language: 'English', proficiency: 'Fluent' },
    { language: 'Spanish', proficiency: 'Intermediate' },
  ]);

  const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

  const isActive = activeSection === 'languages';

  const handleAddLanguage = () => {
    const newEntry: LanguageEntry = { language: 'New Language', proficiency: 'Beginner' };
    setLanguages([...languages, newEntry]);
  };

  const handleLanguageChange = (index: number, field: keyof LanguageEntry, value: string) => {
    const updatedLanguages = languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    setLanguages(updatedLanguages);
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection('languages'));
      }}
      className={`space-y-4 p-4 rounded border cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddLanguage();
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Add new language"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      {/* Languages List */}
      <div className="space-y-2">
        {languages.map((language, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-gray-200 p-3 rounded shadow-sm"
          >
            {/* Editable Language Name */}
            <input
              type="text"
              value={language.language}
              onChange={(e) =>
                handleLanguageChange(index, 'language', e.target.value)
              }
              className={`bg-transparent focus:outline-none text-gray-800 text-sm w-full ${
                isActive ? '' : 'pointer-events-none'
              }`}
              placeholder="Language"
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
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSection;
