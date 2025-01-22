import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setActiveSection } from '../activeSectionSlice';
import { titleToStateKey } from '../utils/sectionUtils';

interface Action {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  ariaLabel: string;
}

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
  actions?: Action[];
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children, actions = [] }) => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isLoading = useSelector((state: RootState) => 
    state.loading.sectionLoading[titleToStateKey(title)]
  );
  const isActive = activeSection === title;

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection(title));
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
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
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
      <div className={isLoading ? 'opacity-50' : ''}>
        {isLoading ? <LoadingSkeleton /> : children}
      </div>
    </div>
  );
};

export default SectionWrapper;
