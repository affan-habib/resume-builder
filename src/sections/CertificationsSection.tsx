import React from 'react';
import { Plus, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addCertification, editCertification, removeCertification } from '../store/slices/resumeSlice';
import EditableField from '../components/EditableField';
import SectionWrapper from '../components/SectionWrapper';

const CertificationsSection: React.FC = () => {
  const dispatch = useDispatch();
  const certifications = useSelector((state: RootState) => state.resume.certifications);
  const title = 'Certifications';
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const isActive = activeSection === title;

  const handleAddCertification = () => {
    const newCertification = {
      name: 'New Certification',
      issuer: '',
      startDate: '',
      endDate: ''
    };
    dispatch(addCertification(newCertification));
  };

  const handleCertificationChange = (index: number, field: keyof typeof certifications[0], value: string) => {
    dispatch(editCertification({ index, field, value }));
  };

  const handleRemoveCertification = (index: number) => {
    dispatch(removeCertification(index));
  };

  const actions = [
    {
      icon: <Plus size={20} />,
      onClick: handleAddCertification,
      ariaLabel: 'Add new certification',
    },
  ];

  return (
    <SectionWrapper title={title} actions={actions}>
      <div className="space-y-4">
        {certifications.map((certification, index) => (
          <div key={index} className="space-y-2 rounded-lg">
            {/* Certification Name */}
            <EditableField
              value={certification.name}
              placeholder="Certification Name"
              onSave={(value) => handleCertificationChange(index, 'name', value)}
              className="text-lg font-medium"
            />

            {/* Issuer */}
            <EditableField
              value={certification.issuer}
              placeholder="Issuing Organization"
              onSave={(value) => handleCertificationChange(index, 'issuer', value)}
              className="text-gray-700"
            />

            {/* Date Range */}
            <div className="flex gap-2">
              <EditableField
                value={certification.startDate}
                placeholder="Start Date"
                onSave={(value) => handleCertificationChange(index, 'startDate', value)}
                className="flex-grow text-gray-600"
              />
              <EditableField
                value={certification.endDate}
                placeholder="End Date"
                onSave={(value) => handleCertificationChange(index, 'endDate', value)}
                className="flex-grow text-gray-600"
              />
            </div>

            {/* Remove Button */}
            {isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveCertification(index);
                }}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-2"
                aria-label="Remove certification"
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

export default CertificationsSection;