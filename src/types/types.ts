export interface PersonalDetails {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  profilePicture: string;
  summary: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  column: 'left' | 'right';
}
