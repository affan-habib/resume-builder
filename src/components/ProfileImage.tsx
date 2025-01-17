import React, { RefObject } from 'react';
import { Upload } from 'lucide-react';

interface ProfileImageProps {
  imageUrl: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, onUpload, fileInputRef }) => (
  <div className="relative group">
    <img
      src={imageUrl}
      alt="Profile"
      className="w-28 h-28 rounded-full object-cover border-4 border-gray-300"
    />
    <button
      onClick={() => fileInputRef.current?.click()}
      className="absolute bottom-0 right-0 bg-white border border-gray-300 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      aria-label="Upload Profile Picture"
    >
      <Upload size={16} />
    </button>
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={onUpload}
      className="hidden"
    />
  </div>
);

export default ProfileImage;
