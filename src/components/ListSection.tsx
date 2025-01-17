import React from 'react';
import { Plus, X } from 'lucide-react';
import EditableField from './EditableField';

interface ListSectionProps {
  items: string[];
  placeholder?: string;
  isActive: boolean;
  onAddItem: () => void;
  onItemChange: (index: number, value: string) => void;
  onRemoveItem: (index: number) => void;
}

const ListSection: React.FC<ListSectionProps> = ({
  items,
  placeholder = 'New Item',
  isActive,
  onAddItem,
  onItemChange,
  onRemoveItem,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700">Key Points</span>
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddItem();
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Add item"
          >
            <Plus size={20} />
          </button>
        )}
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-gray-500">-</span>
          <EditableField
            value={item}
            placeholder={placeholder}
            onSave={(value) => onItemChange(index, value)}
            className={`flex-grow text-sm text-gray-800 focus:outline-none ${
              isActive ? '' : 'pointer-events-none'
            }`}
          />
          {isActive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveItem(index);
              }}
              className="text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Remove item"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListSection;
