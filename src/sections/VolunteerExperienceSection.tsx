import React from 'react';
import { Plus, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addVolunteerExperience, editVolunteerExperience, removeVolunteerExperience } from '@/store/slices/resumeSlice';
import EditableField from '@/components/common/EditableField';
import SectionWrapper from '@/components/resume/SectionWrapper';
import ListSection from '@/components/common/ListSection';

const VolunteerExperienceSection: React.FC = () => {
  const dispatch = useDispatch();
  const volunteerExperience = useSelector((state: RootState) => state.resume.volunteerExperience);
  const title = 'Volunteer Experience';
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title;

  const handleAddExperience = () => {
    const newExperience = {
      role: 'New Role',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: []
    };
    dispatch(addVolunteerExperience(newExperience));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof typeof volunteerExperience[0],
    value: any
  ) => {
    dispatch(editVolunteerExperience({ index, field, value }));
  };

  const handleRemoveExperience = (index: number) => {
    dispatch(removeVolunteerExperience(index));
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddExperience,
      ariaLabel: 'Add volunteer experience',
    },
  ];

  return (
    <SectionWrapper title={title} actions={actions}>
      <div className="space-y-4">
        {volunteerExperience.map((experience, index) => (
          <div key={index} className="space-y-2">
            {/* Role */}
            <EditableField
              value={experience.role}
              placeholder="Role"
              onSave={(value) => handleExperienceChange(index, 'role', value)}
              className="flex-grow text-gray-800"
            />

            {/* Organization */}
            <EditableField
              value={experience.organization}
              placeholder="Organization"
              onSave={(value) => handleExperienceChange(index, 'organization', value)}
              className="flex-grow text-gray-600"
            />

            {/* Location */}
            <EditableField
              value={experience.location}
              placeholder="Location"
              onSave={(value) => handleExperienceChange(index, 'location', value)}
              className="flex-grow text-gray-600"
            />

            {/* Date Range */}
            <div className="flex gap-2">
              <EditableField
                value={experience.startDate}
                placeholder="Start Date"
                onSave={(value) => handleExperienceChange(index, 'startDate', value)}
                className="flex-grow text-gray-600"
              />
              <EditableField
                value={experience.endDate}
                placeholder="End Date"
                onSave={(value) => handleExperienceChange(index, 'endDate', value)}
                className="flex-grow text-gray-600"
              />
            </div>

            {/* Responsibilities */}
            <ListSection
              items={experience.responsibilities || []}
              placeholder="Responsibility"
              isActive={isActive}
              title="Responsibilities"
              onAddItem={() =>
                handleExperienceChange(index, 'responsibilities', [
                  ...(experience.responsibilities || []),
                  'New Responsibility',
                ])
              }
              onItemChange={(respIndex, value) =>
                handleExperienceChange(
                  index,
                  'responsibilities',
                  experience.responsibilities.map((resp, i) => (i === respIndex ? value : resp))
                )
              }
              onRemoveItem={(respIndex) =>
                handleExperienceChange(
                  index,
                  'responsibilities',
                  experience.responsibilities.filter((_, i) => i !== respIndex)
                )
              }
            />

            {/* Remove Experience Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveExperience(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2"
                aria-label="Remove volunteer experience"
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

export default VolunteerExperienceSection;