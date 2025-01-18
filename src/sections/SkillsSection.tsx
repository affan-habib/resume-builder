import React, { useState } from 'react';
import { Plus, Settings, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';

interface Skill {
  name: string;
  percentage: number;
}

const SkillsSection: React.FC = () => {
  const title = 'Skills'; // Section title
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title; // Check if the section is active

  const [skills, setSkills] = useState<Skill[]>([
    { name: 'React', percentage: 80 },
    { name: 'JavaScript', percentage: 70 },
  ]);
  const [displayType, setDisplayType] = useState<'badge' | 'progress'>('progress');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleAddSkill = () => {
    setSkills([...skills, { name: '', percentage: 50 }]);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const handleViewStyleChange = (viewStyle: 'badge' | 'progress') => {
    setDisplayType(viewStyle);
    setShowSettings(false); // Close settings dropdown after selection
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddSkill,
      ariaLabel: 'Add a new skill',
    },
    {
      icon: (
        <div className="relative">
          <Settings size={20} />
          {showSettings && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => handleViewStyleChange('badge')}
                className={`block w-full text-left px-4 py-2 rounded-t-lg ${
                  displayType === 'badge'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                Badge View
              </button>
              <button
                onClick={() => handleViewStyleChange('progress')}
                className={`block w-full text-left px-4 py-2 rounded-b-lg ${
                  displayType === 'progress'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                Progress View
              </button>
            </div>
          )}
        </div>
      ),
      onClick: toggleSettings,
      ariaLabel: 'Open settings',
    },
  ];

  return (
    <SectionWrapper title={title} actions={actions}>
      {/* Skills List */}
      <div className={`flex ${displayType === 'badge' ? 'flex-wrap gap-2' : 'flex-col space-y-2'}`}>
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center justify-between ${
              displayType === 'badge'
                ? 'bg-gray-100 px-4 py-2 rounded-full shadow-sm whitespace-nowrap truncate'
                : 'bg-gray-100 px-4 py-2 rounded shadow-sm'
            }`}
          >
            {/* Editable Skill Name */}
            <div className="flex-1">
              <EditableField
                value={skill.name}
                placeholder="Skill"
                onSave={(value) =>
                  setSkills((prev) =>
                    prev.map((s, i) => (i === index ? { ...s, name: value } : s))
                  )
                }
                className="focus:outline-none text-gray-800"
              />
            </div>

            {/* Progress Bar */}
            {displayType === 'progress' && (
              <div className="flex items-center w-1/2">
                <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-blue-500"
                    style={{ width: `${skill.percentage}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.percentage}
                    onChange={(e) =>
                      setSkills((prev) =>
                        prev.map((s, i) =>
                          i === index ? { ...s, percentage: Number(e.target.value) } : s
                        )
                      )
                    }
                    className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer"
                  />
                </div>
                {isActive && (
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none ml-4"
                    aria-label={`Remove ${skill.name}`}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
