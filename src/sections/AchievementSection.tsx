import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';

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

  const handleAddAchievement = () => {
    const newAchievement: AchievementEntry = {
      title: 'New Achievement',
      description: 'Achievement description',
    };
    const updatedAchievements = [...achievements, newAchievement];
    setAchievements(updatedAchievements);
    onAchievementsChange?.(updatedAchievements);
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

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddAchievement,
      ariaLabel: 'Add new achievement',
    },
  ];

  return (
    <SectionWrapper title="Achievements" actions={actions}>
      {/* Achievements List */}
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex flex-col gap-2">
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
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default AchievementSection;
