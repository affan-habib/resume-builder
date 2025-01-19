import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import type { Section } from '../types';

interface Props {
  section: Section;
  onDelete?: (id: string) => void;
}

export function DraggableSection({ section, onDelete }: Props) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg p-4 mb-4 border border-gray-200 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
        <div className="flex items-center gap-2">
          {onDelete && (
            <button
              onClick={() => onDelete(section.id)}
              className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
              title="Delete section"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-gray-100 p-1 rounded"
          >
            <GripVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-50 rounded w-full" />
        <div className="h-4 bg-gray-50 rounded w-3/4" />
        <div className="h-4 bg-gray-50 rounded w-1/2" />
      </div>
    </div>
  );
}