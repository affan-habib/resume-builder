import React, { useState } from 'react';
import { Plus, Settings, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateSkills } from '../resumeSlice';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';

const SkillsSection: React.FC = () => {
  const title = 'Skills'; // Section title
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.resume.skills);
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title; // Check if the section is active

  const [displayType, setDisplayType] = useState<'badge' | 'progress'>('progress');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleAddSkill = () => {
    const newSkills = [...skills, { name: '', proficiency: 50 }];
    dispatch(updateSkills(newSkills));
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    dispatch(updateSkills(newSkills));
  };

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const handleViewStyleChange = (viewStyle: 'badge' | 'progress') => {
    setDisplayType(viewStyle);
    setShowSettings(false); // Close settings dropdown after selection
  };

  const handleSkillChange = (index: number, updatedSkill: { name: string; proficiency: number }) => {
    const newSkills = skills.map((skill, i) =>
      i === index ? { ...skill, ...updatedSkill } : skill
    );
    dispatch(updateSkills(newSkills));
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
                onSave={(value) => handleSkillChange(index, { name: value, proficiency: skill.proficiency })}
                className="focus:outline-none text-gray-800"
              />
            </div>

            {/* Progress Bar */}
            {displayType === 'progress' && (
              <div className="flex items-center w-1/2">
                <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-blue-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.proficiency}
                    onChange={(e) =>
                      handleSkillChange(index, {
                        name: skill.name,
                        proficiency: Number(e.target.value),
                      })
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
