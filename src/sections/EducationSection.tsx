import React from 'react';
import { Plus, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';

const EducationSection: React.FC = () => {
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);

  const [education, setEducation] = React.useState([
    { institution: 'University A', degree: "Bachelor's", startDate: '2020', endDate: '2024' },
  ]);

  const isActive = activeSection === 'education';

  const handleAddEducation = () => {
    const newEducation = {
      institution: 'New Institution',
      degree: 'New Degree',
      startDate: 'Start',
      endDate: 'End',
    };
    setEducation([...education, newEducation]);
  };

  const handleEducationChange = (index: number, field: keyof typeof education[0], value: string) => {
    setEducation((prevEducation) =>
      prevEducation.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleRemoveEducation = (index: number) => {
    setEducation((prevEducation) => prevEducation.filter((_, i) => i !== index));
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
          <div key={index} className="rounded flex flex-col gap-2">
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

            {/* Remove Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveEducation(index);
                }}
                className="self-end text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Remove education entry"
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
