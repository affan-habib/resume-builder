import React, { useRef, useEffect } from 'react';

interface DropdownProps {
  isOpen: boolean; // Controls visibility
  onClose: () => void; // Callback to handle dropdown close
  onSelect?: () => void; // Optional callback to handle item selection
  children: React.ReactNode; // Content inside the dropdown
  className?: string; // Additional styles
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, onSelect, children, className }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle item selection
  const handleItemClick = (callback?: () => void) => {
    if (callback) callback(); // Execute item-specific logic
    onClose(); // Close dropdown after selection
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 ${className}`}
    >
      {/* Render children with automatic close on click */}
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              onClick: () => handleItemClick(child.props.onClick),
            })
          : child
      )}
    </div>
  );
};

export default Dropdown;
