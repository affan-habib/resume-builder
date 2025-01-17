import React, { useState } from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import { DateRangePicker } from 'react-date-range';
import EditableField from './EditableField';
import SummaryPoints from './SectionWithDetails';

interface SectionEntry {
  title: string;
  dateRange: string;
  summaryPoints: string[];
  [key: string]: any; // Additional fields for customization
}

interface SectionWithDetailsProps {
  title: string;
  titlePlaceholder: string;
  additionalFields?: { key: string; placeholder: string }[];
  initialEntries?: SectionEntry[];
  onEntriesChange?: (entries: SectionEntry[]) => void;
  isActive: boolean;
  onActivate: () => void;
}

const SectionWithDetails: React.FC<SectionWithDetailsProps> = ({
  title,
  titlePlaceholder,
  additionalFields = [],
  initialEntries = [],
  onEntriesChange,
  isActive,
  onActivate,
}) => {
  const [entries, setEntries] = useState<SectionEntry[]>(initialEntries);
  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);

  const handleAddEntry = () => {
    const newEntry: SectionEntry = {
      title: titlePlaceholder,
      dateRange: '',
      summaryPoints: ['New Summary Point'],
      ...Object.fromEntries(additionalFields.map((field) => [field.key, field.placeholder])),
    };
    setEntries([...entries, newEntry]);
    onEntriesChange?.([...entries, newEntry]);
  };

  const handleEntryChange = (index: number, field: string, value: string) => {
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
      onClick={onActivate}
      className={`space-y-4 p-4 rounded border cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-500'
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddEntry();
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label={`Add new ${title}`}
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={index}
            className=" rounded shadow-sm flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <EditableField
                value={entry.title}
                placeholder={titlePlaceholder}
                onSave={(value) => handleEntryChange(index, 'title', value)}
                className="flex-grow focus:outline-none text-gray-800"
              />
              {entry.dateRange && (
                <span className="text-sm text-gray-600">({entry.dateRange})</span>
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
                    ranges={[
                      {
                        startDate: new Date(),
                        endDate: new Date(),
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
                      handleEntryChange(index, 'dateRange', `${start} - ${end}`);
                      setShowDatePicker(null);
                    }}
                    showMonthAndYearPickers
                  />
                </div>
              )}
            </div>

            {additionalFields.map((field) => (
              <EditableField
                key={field.key}
                value={entry[field.key]}
                placeholder={field.placeholder}
                onSave={(value) => handleEntryChange(index, field.key, value)}
                className="text-sm text-gray-800"
              />
            ))}

            <SummaryPoints
              points={entry.summaryPoints}
              onAddPoint={() =>
                handleEntryChange(index, 'summaryPoints', [
                  ...entry.summaryPoints,
                  'New Summary Point',
                ])
              }
              onChangePoint={(pointIndex, value) => {
                const updatedPoints = [...entry.summaryPoints];
                updatedPoints[pointIndex] = value;
                handleEntryChange(index, 'summaryPoints', updatedPoints);
              }}
              onRemovePoint={(pointIndex) => {
                const updatedPoints = entry.summaryPoints.filter((_, i) => i !== pointIndex);
                handleEntryChange(index, 'summaryPoints', updatedPoints);
              }}
              isActive={isActive}
            />

            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveEntry(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2 self-end"
                aria-label={`Remove ${title}`}
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

export default SectionWithDetails;
