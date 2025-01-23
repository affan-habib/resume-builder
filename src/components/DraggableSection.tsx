import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, CheckSquare, Square } from 'lucide-react';
import type { Section } from '../types/types';

interface Props {
  section: Section;
  onDelete?: (id: string) => void;
  visible?: boolean;
  onToggleVisibility?: (id: string) => void;
  compact?: boolean;
}

export function DraggableSection({ 
  section, 
  onDelete, 
  visible = true, 
  onToggleVisibility,
  compact = false 
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const containerClasses = compact
    ? "bg-white rounded-lg p-2 mb-2 border border-gray-200"
    : "bg-white rounded-lg p-4 mb-4 border border-gray-200";

  const iconClasses = compact ? "w-4 h-4" : "w-5 h-5";
  const titleClasses = compact ? "text-sm font-medium" : "text-base font-semibold";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${containerClasses} ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleVisibility?.(section.id)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {visible ? (
              <CheckSquare className={iconClasses} />
            ) : (
              <Square className={iconClasses} />
            )}
          </button>
          <h3 className={`${titleClasses} text-gray-800`}>{section.title}</h3>
        </div>
        <div className="flex items-center gap-1">
          {onDelete && (
            <button
              onClick={() => onDelete(section.id)}
              className="text-red-500 hover:bg-red-50 p-0.5 rounded transition-colors"
              title="Delete section"
            >
              <Trash2 className={iconClasses} />
            </button>
          )}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-gray-100 p-0.5 rounded"
          >
            <GripVertical className={`${iconClasses} text-gray-500`} />
          </button>
        </div>
      </div>
      {!compact && (
        <div className="space-y-2">
          <div className="h-3 bg-gray-50 rounded w-full" />
          <div className="h-3 bg-gray-50 rounded w-3/4" />
          <div className="h-3 bg-gray-50 rounded w-1/2" />
        </div>
      )}
    </div>
  );
}