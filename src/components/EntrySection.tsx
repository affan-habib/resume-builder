import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Calendar, X } from 'lucide-react';
import { RootState } from '../store';
import { setActiveSection } from '../activeSectionSlice';
import EditableField from './EditableField';
import ListSection from './ListSection';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Entry {
  title: string;
  subtitle?: string; // Can represent "position" or "project subtitle"
  dateRange?: string;
  keyPoints?: string[]; // Represents responsibilities or project key points
}

interface EntrySectionProps {
  sectionName: string;
  initialEntries?: Entry[];
  onEntriesChange?: (entries: Entry[]) => void;
  showSubtitle: boolean; // Whether to show the subtitle field (e.g., position)
}

const EntrySection: React.FC<EntrySectionProps> = ({
  sectionName,
  initialEntries = [],
  onEntriesChange,
  showSubtitle,
}) => {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);

  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === sectionName.toLowerCase();

  const handleAddEntry = () => {
    const newEntry: Entry = {
      title: 'New Title',
      subtitle: showSubtitle ? 'New Subtitle' : undefined,
      dateRange: '',
      keyPoints: [],
    };
    setEntries([...entries, newEntry]);
    onEntriesChange?.([...entries, newEntry]);
  };

  const handleEntryChange = (index: number, field: keyof Entry, value: string) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(updatedEntries);
    onEntriesChange?.(updatedEntries);
  };

  const handleRemoveEntry = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    onEntriesChange?.(updatedEntries);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection(sectionName.toLowerCase()));
      }}
      className={`space-y-4 p-2 rounded cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-50' : ''
      }`}
    >
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{sectionName}</h3>
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddEntry();
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label={`Add new ${sectionName}`}
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div key={index} className="  space-y-2">
            {/* Title */}
            {entry.title && (
              <EditableField
                value={entry.title}
                placeholder="Title"
                onSave={(value) => handleEntryChange(index, 'title', value)}
                className="flex-grow text-gray-800"
              />
            )}

            {/* Subtitle */}
            {showSubtitle && entry.subtitle && (
              <EditableField
                value={entry.subtitle}
                placeholder="Subtitle"
                onSave={(value) => handleEntryChange(index, 'subtitle', value)}
                className="flex-grow text-gray-600"
              />
            )}

            {/* Date Range */}
            {entry.dateRange && (
              <span className="text-sm text-gray-600">{`(${entry.dateRange})`}</span>
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
            {showDatePicker === index && (
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

            {/* Key Points */}
            {entry.keyPoints && entry.keyPoints.length > 0 && (
              <ListSection
                items={entry.keyPoints}
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
            )}

            {/* Remove Entry */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveEntry(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2 self-end"
                aria-label="Remove entry"
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

export default EntrySection;
