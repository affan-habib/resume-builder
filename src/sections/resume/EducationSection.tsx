import React from 'react';
import { Plus, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addEducation, editEducation, removeEducation } from '@/store/slices/resumeSlice';
import EditableField from '@/components/common/EditableField';
import SectionWrapper from '@/components/resume/SectionWrapper';

const EducationSection: React.FC = () => {
  const dispatch = useDispatch();
  const education = useSelector((state: RootState) => state.resume.education);
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);

  const isActive = activeSection === 'Education';

  const handleAddEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    dispatch(addEducation(newEducation));
  };

  const handleEducationChange = (index: number, field: keyof typeof education[0], value: string) => {
    dispatch(editEducation({ index, field, value }));
  };

  const handleRemoveEducation = (index: number) => {
    dispatch(removeEducation(index));
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddEducation,
      ariaLabel: 'Add new education entry',
    },
  ];

  return (
    <SectionWrapper title="Education" actions={actions}>
      <div className="space-y-4">
        {education.map((entry, index) => (
          <div
            key={index}
            className="flex flex-col gap-2"
          >
            {/* Institution */}
            <EditableField
              value={entry.institution}
              placeholder="Institution"
              onSave={(value) => handleEducationChange(index, 'institution', value)}
            />

            {/* Degree */}
            <EditableField
              value={entry.degree}
              placeholder="Degree"
              onSave={(value) => handleEducationChange(index, 'degree', value)}
              className="font-medium"
            />

            {/* Start Date and End Date */}
            <div className="flex gap-2">
              <EditableField
                value={entry.startDate}
                placeholder="Start Date"
                onSave={(value) => handleEducationChange(index, 'startDate', value)}
              />
              <EditableField
                value={entry.endDate}
                placeholder="End Date"
                onSave={(value) => handleEducationChange(index, 'endDate', value)}
              />
            </div>

            {/* GPA */}
            <EditableField
              value={entry.gpa}
              placeholder="CGPA"
              onSave={(value) => handleEducationChange(index, 'gpa', value)}
            />

            {/* Remove Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveEducation(index);
                }}
                className="self-end text-red-500 hover:text-red-700 focus:outline-none"
                aria-label={`Remove education entry ${index + 1}`}
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

export default EducationSection;
