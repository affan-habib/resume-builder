import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSection } from '../activeSectionSlice';
import { RootState } from '../store';

interface SectionWrapperProps {
  id: string; // Unique ID for the section
  title: string; // Title of the section
  children: React.ReactNode; // Section content
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children }) => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);

  const isActive = activeSection === id;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection(id));
      }}
      className={`space-y-4 p-4 rounded border cursor-pointer transition-all ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default SectionWrapper;
