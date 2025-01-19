import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DraggableSection } from './DraggableSection';
import type { Section } from '../types';

interface Props {
  id: string;
  sections: Section[];
  onDelete: (id: string) => void;
}

export function Column({ id, sections, onDelete }: Props) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex-1">
      <div
        ref={setNodeRef}
        className="min-h-[200px] rounded-lg"
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
            />
          ))}
          {sections.length === 0 && (
            <div className="h-32 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              Drop sections here
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}