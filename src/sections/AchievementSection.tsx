import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import EditableField from '../components/EditableField';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setActiveSection } from '../activeSectionSlice';

interface AchievementEntry {
  title: string;
  description: string;
}

interface AchievementSectionProps {
  initialAchievements?: AchievementEntry[];
  onAchievementsChange?: (achievements: AchievementEntry[]) => void;
}

const AchievementSection: React.FC<AchievementSectionProps> = ({
  initialAchievements = [],
  onAchievementsChange,
}) => {
  const [achievements, setAchievements] = useState<AchievementEntry[]>(initialAchievements);

  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === 'achievements';

  const handleAddAchievement = () => {
    const newAchievement: AchievementEntry = {
      title: 'New Achievement',
      description: 'Achievement description',
    };
    setAchievements([...achievements, newAchievement]);
    onAchievementsChange?.([...achievements, newAchievement]);
  };

  const handleAchievementChange = (index: number, field: keyof AchievementEntry, value: string) => {
    const updatedAchievements = achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    setAchievements(updatedAchievements);
    onAchievementsChange?.(updatedAchievements);
  };

  const handleRemoveAchievement = (index: number) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
    onAchievementsChange?.(updatedAchievements);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection('achievements'));
      }}
      className={`space-y-4 p-2 rounded cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddAchievement();
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Add new achievement"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className=" rounded shadow-sm flex flex-col gap-2"
          >
            {/* Title */}
            <EditableField
              value={achievement.title}
              placeholder="Achievement Title"
              onSave={(value) => handleAchievementChange(index, 'title', value)}
              className="flex-grow text-gray-800"
            />

            {/* Description */}
            <EditableField
              value={achievement.description}
              placeholder="Achievement Description"
              onSave={(value) => handleAchievementChange(index, 'description', value)}
              className="flex-grow text-gray-600"
            />

            {/* Remove Achievement Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveAchievement(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2 self-end"
                aria-label="Remove achievement"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSection;
