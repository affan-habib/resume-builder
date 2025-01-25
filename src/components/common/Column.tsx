import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
// import { DraggableSection } from './DraggableSection';
import type { Section } from '@/types/types';
import { DraggableSection } from '../resume/DraggableSection';

interface Props {
  id: string;
  sections: Section[];
  onDelete: (id: string) => void;
  visibilityStates?: { [key: string]: boolean };
  onToggleVisibility?: (id: string) => void;
  compact?: boolean;
}

export function Column({ 
  id, 
  sections, 
  onDelete, 
  visibilityStates = {}, 
  onToggleVisibility,
  compact = false 
}: Props) {
  const { setNodeRef } = useDroppable({ id });

  const emptyStateClasses = compact
    ? "h-16 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg text-xs"
    : "h-32 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg text-sm";

  return (
    <div className="flex-1">
      <div
        ref={setNodeRef}
        className={compact ? "min-h-[100px] rounded-lg" : "min-h-[200px] rounded-lg"}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => (
            <DraggableSection
              key={section.id}
              section={section}
              onDelete={onDelete}
              visible={visibilityStates[section.id] ?? true}
              onToggleVisibility={onToggleVisibility}
              compact={compact}
            />
          ))}
          {sections.length === 0 && (
            <div className={emptyStateClasses}>
              Drop sections here
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}