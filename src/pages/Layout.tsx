import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  UniqueIdentifier
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column } from '@/components/common/Column';
// import { DraggableSection } from '@/components/resume/SectionWrapper';
import { RootState } from '@/store/store';
import { toggleSectionVisibility, updateSectionOrder, moveSection, type SectionConfig } from '@/store/slices/settingsSlice';
import type { Section } from '@/types/types';
import { DraggableSection } from '@/components/resume/DraggableSection';

interface LayoutProps {
  visible: boolean;
  onClose: () => void;
}

function Layout({ visible, onClose }: LayoutProps) {
  const dispatch = useDispatch();
  const sections = useSelector((state: RootState) => state.settings.sections);
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (layoutRef.current && !layoutRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [visible, onClose]);

  if (!visible) return null;

  // Convert SectionConfig to Section type
  const convertToSection = (config: SectionConfig): Section => ({
    id: config.id,
    title: config.title,
    content: '',
    column: config.column === 'full' ? 'left' : config.column
  });

  // Create visibility states map
  const visibilityStates = sections.reduce((acc, section) => ({
    ...acc,
    [section.id]: section.visible
  }), {});

  const leftSections = sections
    .filter((s: SectionConfig) => s.column === 'left')
    .sort((a, b) => a.order - b.order)
    .map(convertToSection);

  const rightSections = sections
    .filter((s: SectionConfig) => s.column === 'right')
    .sort((a, b) => a.order - b.order)
    .map(convertToSection);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeSection = sections.find((s: SectionConfig) => s.id === active.id);
    if (!activeSection || activeSection.column === 'full') return;

    if (over.id === 'left' || over.id === 'right') {
      dispatch(moveSection({ 
        id: String(active.id), 
        column: over.id as 'left' | 'right' 
      }));
      return;
    }

    const overSection = sections.find((s: SectionConfig) => s.id === over.id);
    if (!overSection || overSection.column === 'full') return;

    if (activeSection.column !== overSection.column) {
      dispatch(moveSection({ 
        id: String(active.id), 
        column: overSection.column 
      }));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (over.id === 'left' || over.id === 'right') return;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((item: SectionConfig) => item.id === active.id);
      const newIndex = sections.findIndex((item: SectionConfig) => item.id === over.id);
      
      const newSections = [...sections];
      const [movedSection] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, movedSection);
      
      const updatedSections = newSections.map((section: SectionConfig, index: number) => ({
        ...section,
        order: index
      }));
      
      dispatch(updateSectionOrder(updatedSections));
    }
  };

  const handleToggleVisibility = (sectionId: string) => {
    dispatch(toggleSectionVisibility(sectionId));
  };

  const activeSection = sections.find((s: SectionConfig) => s.id === activeId);
  const activeSectionConverted = activeSection ? convertToSection(activeSection) : null;

  return (
    <div 
      ref={layoutRef}
      className="fixed top-16 right-4 w-[120mm] bg-white shadow-lg rounded-lg overflow-hidden z-50"
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex p-2 gap-2">
          <Column 
            id="left" 
            sections={leftSections}
            onDelete={handleToggleVisibility}
            visibilityStates={visibilityStates}
            onToggleVisibility={handleToggleVisibility}
            compact={true}
          />
          <Column 
            id="right" 
            sections={rightSections}
            onDelete={handleToggleVisibility}
            visibilityStates={visibilityStates}
            onToggleVisibility={handleToggleVisibility}
            compact={true}
          />
        </div>
        <DragOverlay>
          {activeId && activeSectionConverted ? (
            <div className="w-[55mm]">
              <DraggableSection
                section={activeSectionConverted}
                onDelete={handleToggleVisibility}
                visible={activeSection?.visible}
                onToggleVisibility={handleToggleVisibility}
                compact={true}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default Layout;
