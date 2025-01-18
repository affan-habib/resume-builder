import React, { useState } from 'react';
import { Plus, Calendar, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';
import ListSection from '../components/ListSection';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Entry {
  title: string;
  subtitle?: string;
  dateRange?: string;
  keyPoints?: string[];
}

const ProjectsSection: React.FC = () => {
  const title = 'Projects'; // Section title
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title; // Check if the section is active

  const [entries, setEntries] = useState<Entry[]>([
    {
      title: 'Project Management App',
      subtitle: 'Team Lead',
      dateRange: 'Jan 2021 - Dec 2021',
      keyPoints: ['Managed team of 5 developers', 'Delivered project on time'],
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);

  const handleAddEntry = () => {
    const newEntry: Entry = {
      title: 'New Project',
      subtitle: 'New Role',
      dateRange: '',
      keyPoints: [],
    };
    setEntries([...entries, newEntry]);
  };

  const handleEntryChange = (index: number, field: keyof Entry, value: string) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(updatedEntries);
  };

  const handleRemoveEntry = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddEntry,
      ariaLabel: 'Add new project',
    },
  ];

  return (
    <SectionWrapper title={title} actions={actions}>
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div key={index} className="space-y-2">
            {/* Project Title */}
            <EditableField
              value={entry.title}
              placeholder="Project Title"
              onSave={(value) => handleEntryChange(index, 'title', value)}
              className="flex-grow text-gray-800"
            />

            {/* Role/Subtitle */}
            <EditableField
              value={entry.subtitle || ''}
              placeholder="Role/Subtitle"
              onSave={(value) => handleEntryChange(index, 'subtitle', value)}
              className="flex-grow text-gray-600"
            />

            {/* Date Range */}
            <div className="flex items-center space-x-2">
              {entry.dateRange && (
                <span className="text-sm text-gray-600">{entry.dateRange}</span>
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
                    ranges={[{ startDate: new Date(), endDate: new Date(), key: 'selection' }]}
                    onChange={(ranges) => {
                      const start = ranges.selection.startDate?.toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      });
                      const end = ranges.selection.endDate?.toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      });
                      handleEntryChange(index, 'dateRange', `${start} - ${end}`);
                      setShowDatePicker(null);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Key Points */}
            <ListSection
              items={entry.keyPoints || []}
              placeholder="Key Point"
              isActive={isActive}
              onAddItem={() =>
                handleEntryChange(index, 'keyPoints', [...(entry.keyPoints || []), 'New Key Point'])
              }
              onItemChange={(keyIndex, value) =>
                handleEntryChange(
                  index,
                  'keyPoints',
                  entry.keyPoints.map((point, i) => (i === keyIndex ? value : point))
                )
              }
              onRemoveItem={(keyIndex) =>
                handleEntryChange(
                  index,
                  'keyPoints',
                  entry.keyPoints.filter((_, i) => i !== keyIndex)
                )
              }
            />

            {/* Remove Project Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveEntry(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2 self-end"
                aria-label="Remove project"
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

export default ProjectsSection;
