import React from 'react';
import { Plus, Settings, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setActiveSection } from '../activeSectionSlice';
import EditableField from '../components/EditableField';

interface Skill {
  name: string;
  percentage: number;
}

const SkillsSection: React.FC = () => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === 'skills'; // Determine active state from Redux

  const [skills, setSkills] = React.useState<Skill[]>([
    { name: 'React', percentage: 80 },
    { name: 'JavaScript', percentage: 70 },
  ]);
  const [displayType, setDisplayType] = React.useState<'badge' | 'progress'>('progress');
  const [showSettings, setShowSettings] = React.useState<boolean>(false);

  const handleAddSkill = () => {
    setSkills([...skills, { name: '', percentage: 50 }]);
  };

  const handleSkillChange = (index: number, updatedSkill: Skill) => {
    const updatedSkills = skills.map((skill, i) => (i === index ? updatedSkill : skill));
    setSkills(updatedSkills);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const handleViewStyleChange = (viewStyle: 'badge' | 'progress') => {
    setDisplayType(viewStyle);
    setShowSettings(false); // Close settings after selection
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection('skills')); // Set active section in Redux
      }}
      className={`relative space-y-4 p-2 rounded cursor-pointer ${isActive ? 'border-blue-500 bg-blue-50' : ''}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        {isActive && (
          <div className="relative flex items-center space-x-2">
            {/* Add Skill Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddSkill();
              }}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
              aria-label="Add new skill"
            >
              <Plus size={20} />
            </button>
            {/* Settings Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSettings();
              }}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
            {/* Settings Dropdown */}
            {showSettings && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => handleViewStyleChange('badge')}
                  className={`block w-full text-left px-4 py-2 rounded-t-lg ${
                    displayType === 'badge' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  Badge View
                </button>
                <button
                  onClick={() => handleViewStyleChange('progress')}
                  className={`block w-full text-left px-4 py-2 rounded-b-lg ${
                    displayType === 'progress' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  Progress View
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Skills List */}
      <div className={`flex ${displayType === 'badge' ? 'flex-wrap gap-2' : 'flex-col space-y-2'}`}>
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center ${
              displayType === 'badge'
                ? 'space-x-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm'
                : 'space-x-4 bg-gray-100 px-4 py-2 rounded shadow-sm'
            }`}
          >
            {/* Editable Skill Name */}
            <div className={`${displayType === 'progress' ? 'w-1/2' : ''}`}>
              <EditableField
                value={skill.name}
                placeholder="Skill"
                onSave={(value) =>
                  handleSkillChange(index, { ...skill, name: value })
                }
                className={`focus:outline-none text-gray-800 ${isActive ? '' : 'pointer-events-none'}`}
              />
            </div>

            {/* Progress Bar */}
            {displayType === 'progress' && (
              <div className="w-1/2">
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
                      handleSkillChange(index, {
                        ...skill,
                        percentage: Number(e.target.value),
                      })
                    }
                    className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Remove Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSkill(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                aria-label={`Remove skill`}
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
