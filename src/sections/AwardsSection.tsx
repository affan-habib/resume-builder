import React from 'react';
import { Plus, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addAward, editAward, removeAward } from '../resumeSlice';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';

const AwardsSection: React.FC = () => {
  const dispatch = useDispatch();
  const awards = useSelector((state: RootState) => state.resume.awards);
  const title = 'Awards';
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title;

  const handleAddAward = () => {
    const newAward = {
      title: 'New Award',
      issuer: '',
      date: '',
      description: ''
    };
    dispatch(addAward(newAward));
  };

  const handleAwardChange = (index: number, field: keyof typeof awards[0], value: string) => {
    dispatch(editAward({ index, field, value }));
  };

  const handleRemoveAward = (index: number) => {
    dispatch(removeAward(index));
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddAward,
      ariaLabel: 'Add new award',
    },
  ];

  return (
    <SectionWrapper title={title} actions={actions}>
      <div className="space-y-4">
        {awards.map((award, index) => (
          <div key={index} className="space-y-2 bg-gray-50 p-4 rounded-lg">
            {/* Award Title */}
            <EditableField
              value={award.title}
              placeholder="Award Title"
              onSave={(value) => handleAwardChange(index, 'title', value)}
              className="text-lg font-medium"
            />

            {/* Issuer */}
            <EditableField
              value={award.issuer}
              placeholder="Issuing Organization"
              onSave={(value) => handleAwardChange(index, 'issuer', value)}
              className="text-gray-700"
            />

            {/* Date */}
            <EditableField
              value={award.date}
              placeholder="Date Received"
              onSave={(value) => handleAwardChange(index, 'date', value)}
              className="text-gray-600"
            />

            {/* Description */}
            <EditableField
              value={award.description}
              placeholder="Description"
              onSave={(value) => handleAwardChange(index, 'description', value)}
              className="text-gray-600"
            />

            {/* Remove Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveAward(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2"
                aria-label="Remove award"
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

export default AwardsSection;