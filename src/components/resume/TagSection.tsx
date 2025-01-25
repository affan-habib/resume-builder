import React from 'react';
import { Plus, X } from 'lucide-react';
import EditableField from './EditableField';

interface TagSectionProps {
  title: string;
  placeholder?: string;
  initialTags?: string[];
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onTagsChange?: (tags: string[]) => void;
}

const TagSection: React.FC<TagSectionProps> = ({
  title,
  placeholder = 'New Tag',
  initialTags = [],
  isActive,
  onActivate,
  onDeactivate,
  onTagsChange,
}) => {
  const [tags, setTags] = React.useState<string[]>(initialTags);

  const handleAddTag = () => {
    setTags([...tags, placeholder]);
    onTagsChange?.([...tags, placeholder]);
  };

  const handleTagChange = (index: number, value: string) => {
    const updatedTags = tags.map((tag, i) => (i === index ? value : tag));
    setTags(updatedTags);
    onTagsChange?.(updatedTags);
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onTagsChange?.(updatedTags);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
      className={`space-y-4 p-2 rounded cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-50' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent section click from toggling active state
              handleAddTag();
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label={`Add new ${title}`}
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm px-3 py-1 rounded-full shadow-sm bg-gray-200"
          >
            <EditableField
              value={tag}
              placeholder={placeholder}
              onSave={(value) => handleTagChange(index, value)}
              className={`focus:outline-none text-gray-800 ${
                isActive ? '' : 'pointer-events-none'
              }`}
            />
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                aria-label={`Remove ${title}`}
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSection;
