import React from 'react';
import { Plus, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addAchievement, editAchievement, removeAchievement } from '../resumeSlice';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';

const AchievementSection: React.FC = () => {
  const dispatch = useDispatch();
  const achievements = useSelector((state: RootState) => state.resume.achievements);
  const title = 'Achievements';
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isAcvive = activeSection === title;
  const handleAddAchievement = () => {
    dispatch(addAchievement({ title: 'New Achievement', description: 'Achievement description' }));
  };

  const handleAchievementChange = (index: number, field: keyof typeof achievements[0], value: string) => {
    dispatch(editAchievement({ index, field, value }));
  };

  const handleRemoveAchievement = (index: number) => {
    dispatch(removeAchievement(index));
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddAchievement,
      ariaLabel: 'Add new achievement',
    },
  ];

  return (
    <SectionWrapper title={title} actions={actions}>
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
            {isAcvive  && <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveAchievement(index);
              }}
              className="text-red-500 hover:text-red-700 focus:outline-none mt-2 self-end"
              aria-label="Remove achievement"
            >
              <X size={20} />
            </button>}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default AchievementSection;
