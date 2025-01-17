import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import EditableField from './EditableField';

interface EducationEntry {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

interface EducationSectionProps {
  initialEducation?: EducationEntry[];
  onEducationChange?: (education: EducationEntry[]) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  initialEducation = [],
  onEducationChange,
}) => {
  const [education, setEducation] = useState<EducationEntry[]>(initialEducation);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleAddEducation = () => {
    const newEntry: EducationEntry = {
      institution: 'New Institution',
      degree: 'New Degree',
      startDate: 'Start Date',
      endDate: 'End Date',
    };
    setEducation([...education, newEntry]);
    onEducationChange?.([...education, newEntry]);
  };

  const handleEducationChange = (index: number, field: keyof EducationEntry, value: string) => {
    const updatedEducation = education.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEducation(updatedEducation);
    onEducationChange?.(updatedEducation);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
    onEducationChange?.(updatedEducation);
  };

  const toggleActiveState = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div
      onClick={toggleActiveState}
      className={`space-y-4 p-4 rounded border cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddEducation();
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Add new education entry"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      {/* Education List */}
      <div className="space-y-4">
        {education.map((entry, index) => (
          <div
            key={index}
            className="p-4 rounded bg-gray-200 shadow-sm flex flex-col gap-2"
          >
            <EditableField
              value={entry.institution}
              placeholder="Institution"
              onSave={(value) => handleEducationChange(index, 'institution', value)}
              className={`focus:outline-none text-gray-800 ${
                isActive ? '' : 'pointer-events-none'
              }`}
            />
            <EditableField
              value={entry.degree}
              placeholder="Degree"
              onSave={(value) => handleEducationChange(index, 'degree', value)}
              className={`focus:outline-none text-gray-800 ${
                isActive ? '' : 'pointer-events-none'
              }`}
            />
            <div className="flex gap-2">
              <EditableField
                value={entry.startDate}
                placeholder="Start Date"
                onSave={(value) => handleEducationChange(index, 'startDate', value)}
                className={`focus:outline-none text-gray-800 ${
                  isActive ? '' : 'pointer-events-none'
                }`}
              />
              <EditableField
                value={entry.endDate}
                placeholder="End Date"
                onSave={(value) => handleEducationChange(index, 'endDate', value)}
                className={`focus:outline-none text-gray-800 ${
                  isActive ? '' : 'pointer-events-none'
                }`}
              />
            </div>
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
    </div>
  );
};

export default EducationSection;
