import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updatePersonalInfo } from '@/store/slices/resumeSlice';
import { setActiveSection } from '@/store/slices/activeSectionSlice';
import { templates } from '@/store/slices/settingsSlice';
import ProfileImage from '@/components/common/ProfileImage';
import EditableField from '@/components/common/EditableField';
import ContactLink from '@/components/common/ContactLink';
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

type PersonalInfoField = string | { [key: string]: string };

const PersonalDetails: React.FC = () => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);
  const personalInformation = useSelector((state: RootState) => state.resume.personalInformation);
  const theme = useSelector((state: RootState) => state.settings.theme);
  const currentTemplateId = useSelector((state: RootState) => state.settings.template);
  
  const template = templates.find(t => t.id === currentTemplateId);
  const styles = template?.personalDetailsStyle;

  const isActive = activeSection === 'personalDetails';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof typeof personalInformation, value: PersonalInfoField) => {
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

  if (!styles) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setActiveSection('personalDetails'));
      }}
      className={`space-y-6 p-10 pb-4 cursor-pointer ${isActive ? 'border-blue-500 bg-blue-500' : ''} ${styles.background}`}
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
            className={`text-2xl font-semibold ${styles.textColor}`}
            style={{ color: theme }}
          />
          <EditableField
            value={personalInformation.title}
            placeholder={placeholders.title}
            onSave={(value) => updateField('title', value)}
            className={`text-lg ${styles.titleColor}`}
          />
          <EditableField
            value={personalInformation.summary}
            placeholder={placeholders.summary}
            onSave={(value) => updateField('summary', value)}
            className={`text-sm ${styles.summaryColor}`}
          />
        </div>
      </div>

      {/* Contact Links */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b py-4 ${styles.contactsColor}`}>
        <ContactLink
          icon={<Mail className={`w-5 h-5 mr-2 ${styles.contactsColor}`} />}
          value={personalInformation.contact.email}
          placeholder={placeholders.email}
          onSave={(value) => {
            const updatedContact = { ...personalInformation.contact, email: value };
            updateField('contact', updatedContact);
          }}
          className={styles.contactsColor}
        />
        <ContactLink
          icon={<Phone className={`w-5 h-5 mr-2 ${styles.contactsColor}`} />}
          value={personalInformation.contact.phone}
          placeholder={placeholders.phone}
          onSave={(value) => {
            const updatedContact = { ...personalInformation.contact, phone: value };
            updateField('contact', updatedContact);
          }}
          className={styles.contactsColor}
        />
        <ContactLink
          icon={<MapPin className={`w-5 h-5 mr-2 ${styles.contactsColor}`} />}
          value={personalInformation.contact.address}
          placeholder={placeholders.location}
          onSave={(value) => {
            const updatedContact = { ...personalInformation.contact, address: value };
            updateField('contact', updatedContact);
          }}
          className={styles.contactsColor}
        />
        <ContactLink
          icon={<Linkedin className={`w-5 h-5 mr-2 ${styles.contactsColor}`} />}
          value={personalInformation.contact.linkedin}
          placeholder={placeholders.linkedin}
          onSave={(value) => {
            const updatedContact = { ...personalInformation.contact, linkedin: value };
            updateField('contact', updatedContact);
          }}
          className={styles.contactsColor}
        />
        <ContactLink
          icon={<Github className={`w-5 h-5 mr-2 ${styles.contactsColor}`} />}
          value={personalInformation.contact.github}
          placeholder={placeholders.github}
          onSave={(value) => {
            const updatedContact = { ...personalInformation.contact, github: value };
            updateField('contact', updatedContact);
          }}
          className={styles.contactsColor}
        />
        <ContactLink
          icon={<Globe className={`w-5 h-5 mr-2 ${styles.contactsColor}`} />}
          value={personalInformation.contact.portfolio}
          placeholder={placeholders.portfolio}
          onSave={(value) => {
            const updatedContact = { ...personalInformation.contact, portfolio: value };
            updateField('contact', updatedContact);
          }}
          className={styles.contactsColor}
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
