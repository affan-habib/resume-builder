export interface PersonalDetails {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    profilePicture?: string;
  }
  
  export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current?: boolean;
    description: string[];
  }
  
  export interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    description?: string;
  }
  
  export interface Skill {
    id: string;
    name: string;
    level: number; // 1-5
    category?: string;
  }
  
  export interface Resume {
    personalDetails: PersonalDetails;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
  }