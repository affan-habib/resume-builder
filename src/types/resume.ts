export interface Contact {
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface WorkExperience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Skill {
  name: string;
  proficiency: number;
}

export interface Certification {
  name: string;
  issuer: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  repositoryLink: string;
  liveDemoLink: string;
  role: string;
  startDate: string;
  endDate: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface VolunteerExperience {
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Reference {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface ResumeState {
  personalInformation: {
    name: string;
    title: string;
    contact: Contact;
    summary: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  awards: Award[];
  volunteerExperience: VolunteerExperience[];
  references: Reference[];
}