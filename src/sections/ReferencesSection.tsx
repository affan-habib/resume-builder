import React from 'react';
import { Plus, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addReference, editReference, removeReference } from '../store/slices/resumeSlice';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';

const ReferencesSection: React.FC = () => {
  const dispatch = useDispatch();
  const references = useSelector((state: RootState) => state.resume.references);
  const title = 'References';
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title;

  const handleAddReference = () => {
    const newReference = {
      name: '',
      jobTitle: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    };
    dispatch(addReference(newReference));
  };

  const handleReferenceChange = (index: number, field: keyof typeof references[0], value: string) => {
    dispatch(editReference({ index, field, value }));
  };

  const handleRemoveReference = (index: number) => {
    dispatch(removeReference(index));
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddReference,
      ariaLabel: 'Add new reference',
    },
  ];

  return (
    <SectionWrapper title={title} actions={actions}>
      <div className="space-y-4">
        {references.map((reference, index) => (
          <div key={index} className="space-y-2 rounded-lg">
            {/* Name */}
            <EditableField
              value={reference.name}
              placeholder="Full Name"
              onSave={(value) => handleReferenceChange(index, 'name', value)}
              className="text-lg font-medium"
            />

            {/* Job Title */}
            <EditableField
              value={reference.jobTitle}
              placeholder="Job Title"
              onSave={(value) => handleReferenceChange(index, 'jobTitle', value)}
              className="text-gray-700"
            />

            {/* Company */}
            <EditableField
              value={reference.company}
              placeholder="Company"
              onSave={(value) => handleReferenceChange(index, 'company', value)}
              className="text-gray-700"
            />

            {/* Email */}
            <EditableField
              value={reference.email}
              placeholder="Email"
              onSave={(value) => handleReferenceChange(index, 'email', value)}
              className="text-gray-600"
            />

            {/* Phone */}
            <EditableField
              value={reference.phone}
              placeholder="Phone"
              onSave={(value) => handleReferenceChange(index, 'phone', value)}
              className="text-gray-600"
            />

            {/* Relationship */}
            <EditableField
              value={reference.relationship}
              placeholder="Relationship"
              onSave={(value) => handleReferenceChange(index, 'relationship', value)}
              className="text-gray-600"
            />

            {/* Remove Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveReference(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2"
                aria-label="Remove reference"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ReferencesSection;