import React, { useState, useRef } from 'react';
import ProfileImage from './ProfileImage';
import EditableField from './EditableField';
import ContactLink from './ContactLink';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const placeholders = {
  fullName: 'John Doe',
  title: 'Professional Title',
  summary: 'A concise summary about your professional background and skills.',
  email: 'you@example.com',
  phone: '(123) 456-7890',
  location: 'City, Country',
  linkedin: 'linkedin.com/in/yourprofile',
};

const PersonalDetails: React.FC = () => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.activeSection.activeSection);

  const isActive = activeSection === 'personalDetails';
  const [details, setDetails] = useState({
    fullName: '',
    title: '',
    summary: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    profilePicture:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateDetail = (field: string, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateDetail('profilePicture', event.target?.result as string);
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
      className={`space-y-6 p-4 rounded border cursor-pointer ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
        }`}
    >
      {/* Profile Picture and Editable Fields */}
      <div className="flex items-center gap-6">
        <ProfileImage
          imageUrl={details.profilePicture}
          onUpload={handleImageUpload}
          fileInputRef={fileInputRef}
        />
        <div className="flex-1 space-y-2">
          <EditableField
            value={details.fullName}
            placeholder={placeholders.fullName}
            onSave={(value) => updateDetail('fullName', value)}
            className="text-2xl font-semibold text-gray-900"
          />
          <EditableField
            value={details.title}
            placeholder={placeholders.title}
            onSave={(value) => updateDetail('title', value)}
            className="text-lg text-gray-600"
          />
          <EditableField
            value={details.summary}
            placeholder={placeholders.summary}
            onSave={(value) => updateDetail('summary', value)}
            className="text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Contact Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b p-4">
        <ContactLink
          icon={<Mail className="w-5 h-5 text-gray-500 mr-2" />}
          value={details.email}
          placeholder={placeholders.email}
          onSave={(value) => updateDetail('email', value)}
        />
        <ContactLink
          icon={<Phone className="w-5 h-5 text-gray-500 mr-2" />}
          value={details.phone}
          placeholder={placeholders.phone}
          onSave={(value) => updateDetail('phone', value)}
        />
        <ContactLink
          icon={<MapPin className="w-5 h-5 text-gray-500 mr-2" />}
          value={details.location}
          placeholder={placeholders.location}
          onSave={(value) => updateDetail('location', value)}
        />
        <ContactLink
          icon={<Linkedin className="w-5 h-5 text-gray-500 mr-2" />}
          value={details.linkedin}
          placeholder={placeholders.linkedin}
          onSave={(value) => updateDetail('linkedin', value)}
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
