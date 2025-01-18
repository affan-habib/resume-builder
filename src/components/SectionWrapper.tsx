import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setActiveSection } from '../activeSectionSlice';

interface Action {
  icon: React.ReactNode; // Icon component
  onClick: (e: React.MouseEvent) => void; // Click handler
  ariaLabel: string; // Accessibility label
}

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
  actions?: Action[]; // Dynamic actions as an array
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children, actions = [] }) => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection(title)); // Set active section in Redux
      }}
      className={`relative space-y-4 p-2 rounded cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isActive && (
          <div className="flex items-center space-x-2">
            {/* Render dynamic actions */}
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering section activation
                  action.onClick(e);
                }}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={action.ariaLabel}
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Content */}
      {children}
    </div>
  );
};

export default SectionWrapper;
