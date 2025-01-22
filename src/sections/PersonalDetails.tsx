import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updatePersonalInfo } from '../store/slices/resumeSlice';
import { setActiveSection } from '../store/slices/activeSectionSlice';
import ProfileImage from '../components/ProfileImage';
import EditableField from '../components/EditableField';
import ContactLink from '../components/ContactLink';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const placeholders = {
  fullName: 'John Doe',
  title: 'Professional Title',
  summary: 'A concise summary about your professional background and skills.',
  email: 'you@example.com',
  phone: '(123) 456-7890',
  location: 'City, Country',
  linkedin: 'linkedin.com/in/yourprofile',
  github: 'github.com/yourusername',
  portfolio: 'https://yourportfolio.com',
};

const PersonalDetails: React.FC = () => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const personalInformation = useSelector((state: RootState) => state.resume.personalInformation);

  const isActive = activeSection === 'personalDetails';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof typeof personalInformation, value: string) => {
    dispatch(updatePersonalInfo({ ...personalInformation, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateField('profilePicture', event.target.result as string);
        }
      };
      reader.onerror = () => {
        alert('Failed to load image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection('personalDetails'));
      }}
      className={`space-y-6 rounded-lg p-4 cursor-pointer ${isActive ? 'border-blue-500 bg-blue-50' : ''
        }`}
    >
      {/* Profile Picture and Editable Fields */}
      <div className="flex items-center gap-6">
        <ProfileImage
          imageUrl={personalInformation.profilePicture}
          onUpload={handleImageUpload}
          fileInputRef={fileInputRef}
        />
        <div className="flex-1 space-y-2">
          <EditableField
            value={personalInformation.name}
            placeholder={placeholders.fullName}
            onSave={(value) => updateField('name', value)}
            className="text-2xl font-semibold text-gray-900"
          />
          <EditableField
            value={personalInformation.title}
            placeholder={placeholders.title}
            onSave={(value) => updateField('title', value)}
            className="text-lg text-gray-600"
          />
          <EditableField
            value={personalInformation.summary}
            placeholder={placeholders.summary}
            onSave={(value) => updateField('summary', value)}
            className="text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Contact Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b py-4">
        <ContactLink
          icon={<Mail className="w-5 h-5 text-gray-500 mr-2" />}
          value={personalInformation.contact.email}
          placeholder={placeholders.email}
          onSave={(value) => updateField('contact', { ...personalInformation.contact, email: value })}
        />
        <ContactLink
          icon={<Phone className="w-5 h-5 text-gray-500 mr-2" />}
          value={personalInformation.contact.phone}
          placeholder={placeholders.phone}
          onSave={(value) => updateField('contact', { ...personalInformation.contact, phone: value })}
        />
        <ContactLink
          icon={<MapPin className="w-5 h-5 text-gray-500 mr-2" />}
          value={personalInformation.contact.address}
          placeholder={placeholders.location}
          onSave={(value) => updateField('contact', { ...personalInformation.contact, address: value })}
        />
        <ContactLink
          icon={<Linkedin className="w-5 h-5 text-gray-500 mr-2" />}
          value={personalInformation.contact.linkedin}
          placeholder={placeholders.linkedin}
          onSave={(value) => updateField('contact', { ...personalInformation.contact, linkedin: value })}
        />
        <ContactLink
          icon={<Github className="w-5 h-5 text-gray-500 mr-2" />}
          value={personalInformation.contact.github}
          placeholder={placeholders.github}
          onSave={(value) => updateField('contact', { ...personalInformation.contact, github: value })}
        />
        <ContactLink
          icon={<Globe className="w-5 h-5 text-gray-500 mr-2" />}
          value={personalInformation.contact.portfolio}
          placeholder={placeholders.portfolio}
          onSave={(value) => updateField('contact', { ...personalInformation.contact, portfolio: value })}
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
