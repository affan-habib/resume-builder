import React from 'react';
import { Plus, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addInterest, editInterest, removeInterest } from '../store/slices/resumeSlice';
import SectionWrapper from '../components/SectionWrapper';
import EditableField from '../components/EditableField';

const InterestSection: React.FC = () => {
  const title = 'Interests'; // Section title
  const dispatch = useDispatch();
  const interests = useSelector((state: RootState) => state.resume.interests);
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title; // Check if the section is active
  const placeholder = 'Interest';

  const handleAddTag = () => {
    dispatch(addInterest(''));
  };

  const handleTagChange = (index: number, value: string) => {
    dispatch(editInterest({ index, value }));
  };

  const handleRemoveTag = (index: number) => {
    dispatch(removeInterest(index));
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddTag,
      ariaLabel: `Add new ${title}`,
    },
  ];

  return (
    <SectionWrapper title={title} actions={isActive ? actions : []}>
      <div className="flex flex-wrap gap-2">
        {interests.map((tag, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm px-3 py-1 rounded-full shadow-sm bg-gray-200"
          >
            <EditableField
              value={tag}
              placeholder={placeholder}
              onSave={(value) => handleTagChange(index, value)}
              className={`focus:outline-none text-gray-800 ${
                isActive ? '' : 'pointer-events-none'
              }`}
            />
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                aria-label={`Remove ${tag}`}
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default InterestSection;
