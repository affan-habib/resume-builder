import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';
import ListSection from '../components/ListSection';

interface ExperienceEntry {
  title: string;
  subtitle?: string;
  dateRange?: string;
  keyPoints?: string[];
}

const ProfessionalExperienceSection: React.FC = () => {
  const title = 'Professional Experience'; // Section title
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title; // Check if the section is active

  const [entries, setEntries] = useState<ExperienceEntry[]>([
    {
      title: 'Software Engineer',
      subtitle: 'Tech Corp',
      dateRange: 'Jan 2020 - Dec 2022',
      keyPoints: ['Developed scalable APIs', 'Improved system performance by 40%'],
    },
  ]);

  const handleAddEntry = () => {
    const newEntry: ExperienceEntry = {
      title: 'New Role',
      subtitle: 'New Company',
      dateRange: '',
      keyPoints: [],
    };
    setEntries([...entries, newEntry]);
  };

  const handleEntryChange = (index: number, field: keyof ExperienceEntry, value: string) => {
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
      ariaLabel: 'Add new experience',
    },
  ];

  return (
    <SectionWrapper title={title} actions={actions}>
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div key={index} className="space-y-2">
            {/* Job Title */}
            <EditableField
              value={entry.title}
              placeholder="Job Title"
              onSave={(value) => handleEntryChange(index, 'title', value)}
              className="flex-grow text-gray-800"
            />

            {/* Company Name */}
            <EditableField
              value={entry.subtitle || ''}
              placeholder="Company Name"
              onSave={(value) => handleEntryChange(index, 'subtitle', value)}
              className="flex-grow text-gray-600"
            />

            {/* Date Range */}
            <EditableField
              value={entry.dateRange || ''}
              placeholder="Date Range"
              onSave={(value) => handleEntryChange(index, 'dateRange', value)}
              className="text-sm text-gray-600"
            />

            {/* Key Points */}
            <ListSection
              items={entry.keyPoints || []}
              placeholder="Key Responsibility"
              isActive={isActive}
              onAddItem={() =>
                handleEntryChange(index, 'keyPoints', [
                  ...(entry.keyPoints || []),
                  'New Responsibility',
                ])
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

            {/* Remove Entry Button */}
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
