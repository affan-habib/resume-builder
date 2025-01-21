import React, { useState } from 'react';
import { Plus, Calendar, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addWorkExperience, editWorkExperience, removeWorkExperience } from '../resumeSlice';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';
import ListSection from '../components/ListSection';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const ProfessionalExperienceSection: React.FC = () => {
  const dispatch = useDispatch();
  const workExperience = useSelector((state: RootState) => state.resume.workExperience);
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const title = 'Professional Experience';
  const isActive = activeSection === title;

  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);

  const handleAddEntry = () => {
    const newEntry = {
      jobTitle: 'New Job Title',
      company: 'New Company',
      location: 'New Location',
      startDate: '',
      endDate: '',
      responsibilities: [],
      achievements: [],
    };
    dispatch(addWorkExperience(newEntry));
  };

  const handleEntryChange = (
    index: number,
    field: keyof typeof workExperience[0],
    value: any
  ) => {
    dispatch(editWorkExperience({ index, field, value }));
  };

  const handleRemoveEntry = (index: number) => {
    dispatch(removeWorkExperience(index));
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddEntry,
      ariaLabel: 'Add new experience',
    },
  ];

  return (
    <SectionWrapper title={title} actions={actions}>
      <div className="space-y-4">
        {workExperience.map((entry, index) => (
          <div key={index} className="space-y-2">
            {/* Job Title */}
            <EditableField
              value={entry.jobTitle}
              placeholder="Job Title"
              onSave={(value) => handleEntryChange(index, 'jobTitle', value)}
              className="flex-grow text-gray-800"
            />

            {/* Company Name */}
            <EditableField
              value={entry.company}
              placeholder="Company Name"
              onSave={(value) => handleEntryChange(index, 'company', value)}
              className="flex-grow text-gray-600"
            />

            {/* Location */}
            <EditableField
              value={entry.location}
              placeholder="Location"
              onSave={(value) => handleEntryChange(index, 'location', value)}
              className="flex-grow text-gray-600"
            />

            {/* Date Range */}
            <div className="flex items-center space-x-2">
              {entry.startDate && entry.endDate && (
                <span className="text-sm text-gray-600">
                  {`${entry.startDate} - ${entry.endDate}`}
                </span>
              )}
              {isActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDatePicker((prev) => (prev === index ? null : index));
                  }}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  aria-label="Pick date range"
                >
                  <Calendar size={18} />
                </button>
              )}
              {isActive && showDatePicker === index && (
                <div className="absolute mt-2 z-10">
                  <DateRangePicker
                    ranges={[
                      {
                        startDate: new Date(entry.startDate || Date.now()),
                        endDate: new Date(entry.endDate || Date.now()),
                        key: 'selection',
                      },
                    ]}
                    onChange={(ranges) => {
                      const start = ranges.selection.startDate?.toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      });
                      const end = ranges.selection.endDate?.toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      });
                      handleEntryChange(index, 'startDate', start || '');
                      handleEntryChange(index, 'endDate', end || '');
                      setShowDatePicker(null);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Responsibilities */}
            <ListSection
              items={entry.responsibilities || []}
              placeholder="Key Responsibility"
              isActive={isActive}
              title="Key Responsibilities"
              onAddItem={() =>
                handleEntryChange(index, 'responsibilities', [
                  ...(entry.responsibilities || []),
                  'New Responsibility',
                ])
              }
              onItemChange={(keyIndex, value) =>
                handleEntryChange(
                  index,
                  'responsibilities',
                  entry.responsibilities.map((point, i) => (i === keyIndex ? value : point))
                )
              }
              onRemoveItem={(keyIndex) =>
                handleEntryChange(
                  index,
                  'responsibilities',
                  entry.responsibilities.filter((_, i) => i !== keyIndex)
                )
              }
            />        

            {/* Remove Experience Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveEntry(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2 self-end"
                aria-label="Remove experience"
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

export default ProfessionalExperienceSection;
