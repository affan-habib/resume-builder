import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import EditableField from './EditableField';

interface SkillsSectionProps {
  initialSkills?: string[];
  onSkillsChange?: (skills: string[]) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ initialSkills = ['React'], onSkillsChange }) => {
  const [skills, setSkills] = useState<string[]>(initialSkills);

  const handleAddSkill = () => {
    setSkills([...skills, 'New Skill']);
    onSkillsChange?.([...skills, 'New Skill']);
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = skills.map((skill, i) => (i === index ? value : skill));
    setSkills(updatedSkills);
    onSkillsChange?.(updatedSkills);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    onSkillsChange?.(updatedSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <button
          onClick={handleAddSkill}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          aria-label="Add new skill"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 rounded">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm px-3 py-1 rounded-full shadow-sm bg-gray-100"
          >
            <EditableField
              value={skill}
              placeholder="Skill"
              onSave={(value) => handleSkillChange(index, value)}
              className="focus:outline-none text-gray-800"
            />
            <button
              onClick={() => handleRemoveSkill(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Remove skill"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
