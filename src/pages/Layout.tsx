import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Undo2 } from 'lucide-react';
import { Column } from '../components/Column';
import { DraggableSection } from '../components/DraggableSection';
import { PersonalDetails } from '../components/PersonalDetails';
import type { Section } from '../types/types';

const initialSections: Section[] = [
  {
    id: '1',
    title: 'Skills',
    content: '',
    column: 'left',
  },
  {
    id: '2',
    title: 'Experience',
    content: '',
    column: 'left',
  },
  {
    id: '3',
    title: 'Education',
    content: '',
    column: 'left',
  },
  {
    id: '4',
    title: 'Projects',
    content: '',
    column: 'right',
  },
  {
    id: '5',
    title: 'Achievements',
    content: '',
    column: 'right',
  },
  {
    id: '6',
    title: 'Interests',
    content: '',
    column: 'right',
  },
];

function Layout() {
  const [sections, setSections] = useState(initialSections);
  const [history, setHistory] = useState<Section[][]>([initialSections]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const leftSections = sections.filter((s) => s.column === 'left');
  const rightSections = sections.filter((s) => s.column === 'right');

  const handleDragStart = (event: { active: { id: string } }) => {
    setActiveId(event.active.id);
  };

  const updateSectionsWithHistory = (newSections: Section[]) => {
    setSections(newSections);
    setHistory((prev) => [...prev, newSections]);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeSection = sections.find((s) => s.id === active.id);
    if (!activeSection) return;

    if (over.id === 'left' || over.id === 'right') {
      if (activeSection.column !== over.id) {
        const newSections = sections.map((item) => {
          if (item.id === active.id) {
            return { ...item, column: over.id as 'left' | 'right' };
          }
          return item;
        });
        updateSectionsWithHistory(newSections);
      }
      return;
    }

    const overSection = sections.find((s) => s.id === over.id);
    if (!overSection) return;

    if (activeSection.column !== overSection.column) {
      const newSections = sections.map((item) => {
        if (item.id === active.id) {
          return { ...item, column: overSection.column };
        }
        return item;
      });
      updateSectionsWithHistory(newSections);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (over.id === 'left' || over.id === 'right') return;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((item) => item.id === active.id);
      const newIndex = sections.findIndex((item) => item.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      updateSectionsWithHistory(newSections);
    }
  };

  const handleDelete = (sectionId: string) => {
    const newSections = sections.filter((item) => item.id !== sectionId);
    updateSectionsWithHistory(newSections);
  };

  const handleUndo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setSections(newHistory[newHistory.length - 1]);
    }
  };

  const activeSection = sections.find((s) => s.id === activeId);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg">
        <PersonalDetails />
        <div className="px-8 py-4 border-b flex justify-end">
          <button
            onClick={handleUndo}
            disabled={history.length <= 1}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              history.length > 1
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Undo2 className="w-4 h-4" />
            <span>Undo</span>
          </button>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex px-8 pb-8 gap-8">
            <Column
              id="left"
              sections={leftSections}
              onDelete={handleDelete}
            />
            <Column
              id="right"
              sections={rightSections}
              onDelete={handleDelete}
            />
          </div>
          <DragOverlay>
            {activeId && activeSection ? (
              <div className="w-[calc(50%-2rem)]">
                <DraggableSection section={activeSection} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default Layout;