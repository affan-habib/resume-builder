import React from 'react';
import EditableField from './EditableField';

interface ContactLinkProps {
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  onSave: (value: string) => void;
  className?: string;
}

const ContactLink: React.FC<ContactLinkProps> = ({ icon, value, placeholder, onSave, className }) => (
  <div className="flex items-center">
    {icon}
    <EditableField
      value={value}
      placeholder={placeholder}
      onSave={onSave}
      className={`text-sm text-gray-600 ${className}`}
    />
  </div>
);

export default ContactLink;
