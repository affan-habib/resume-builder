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
import { personalDetailsStylesMap } from '@/styles/personalDetailsStyles';

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
  const currentTemplateId = useSelector((state: RootState) => state.settings.template);

  const template = templates.find((t) => t.id === currentTemplateId);
  const styles = personalDetailsStylesMap[currentTemplateId];

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
      className={`${styles.container} ${isActive ? 'border-blue-500 bg-blue-500' : ''}`}
    >
      {/* Profile Picture and Editable Fields */}
      <div className={styles.profileWrapper}>
        <ProfileImage
          imageUrl={personalInformation.profilePicture}
          onUpload={handleImageUpload}
          fileInputRef={fileInputRef}
        />
        <div className={styles.textWrapper}>
          <EditableField
            value={personalInformation.name}
            placeholder={placeholders.fullName}
            onSave={(value) => updateField('name', value)}
            className={styles.name}
          />
          <EditableField
            value={personalInformation.title}
            placeholder={placeholders.title}
            onSave={(value) => updateField('title', value)}
            className={styles.title}
          />
          <EditableField
            value={personalInformation.summary}
            placeholder={placeholders.summary}
            onSave={(value) => updateField('summary', value)}
            className={styles.summary}
          />
        </div>
      </div>

      {/* Contact Links */}
      <div className={styles.contactGrid}>
        {[
          { icon: Mail, field: 'email', placeholder: placeholders.email },
          { icon: Phone, field: 'phone', placeholder: placeholders.phone },
          { icon: MapPin, field: 'address', placeholder: placeholders.location },
          { icon: Linkedin, field: 'linkedin', placeholder: placeholders.linkedin },
          { icon: Github, field: 'github', placeholder: placeholders.github },
          { icon: Globe, field: 'portfolio', placeholder: placeholders.portfolio },
        ].map(({ icon: Icon, field, placeholder }) => (
          <ContactLink
            key={field}
            icon={<Icon className={`${styles.contactIcon}`} />}
            value={personalInformation.contact[field]}
            placeholder={placeholder}
            onSave={(value) => {
              const updatedContact = { ...personalInformation.contact, [field]: value };
              updateField('contact', updatedContact);
            }}
            className={styles.contactItem}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalDetails;
