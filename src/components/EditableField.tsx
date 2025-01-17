import React from 'react';

interface EditableFieldProps {
  value: string;
  placeholder: string;
  onSave: (value: string) => void;
  className?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, placeholder, onSave, className }) => {
  const handleBlur = (e: React.FocusEvent<HTMLParagraphElement>) => {
    onSave(e.target.textContent || '');
  };

  return (
    <p
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400`}
      data-placeholder={placeholder}
    >
      {value}
    </p>
  );
};

export default EditableField;
