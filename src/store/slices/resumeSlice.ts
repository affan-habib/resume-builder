import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ResumeState } from '../../types/resume';

const initialState: ResumeState = {
  personalInformation: {
    name: "John Doe",
    title: "Senior Software Engineer",
    profilePicture: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
    contact: {
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "San Francisco, CA, USA",
      linkedin: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoeportfolio.com"
    },
    summary: "Highly skilled Senior Software Engineer with over 10 years of experience in developing scalable web applications and leading cross-functional teams",
  },
  workExperience: [
    {
      jobTitle: "Senior Software Engineer",
      company: "Tech Innovators Inc.",
      location: "San Francisco, CA",
      startDate: "2020-06",
      endDate: "Present",
      responsibilities: [
        "Lead a team of 8 developers in designing and implementing scalable web applications using React and Node.js.",
        "Architected and deployed microservices on AWS, improving system reliability by 30%.",
        "Collaborated with product managers to define project requirements and deliver features on time."
      ],
    },
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      startDate: "2013-09",
      endDate: "2015-06",
      gpa: "3.9"
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "University of California, Berkeley",
      startDate: "2009-09",
      endDate: "2013-06",
      gpa: "3.8"
    }
  ],
  skills: [
    { name: "JavaScript", proficiency: 90 },
    { name: "Python", proficiency: 85 },
    { name: "React", proficiency: 80 },
    { name: "Node.js", proficiency: 85 },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      startDate: "2021-04",
      endDate: "2024-04"
    },
    {
      name: "Certified Scrum Master (CSM)",
      issuer: "Scrum Alliance",
      startDate: "2019-07",
      endDate: "2022-07"
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      keyPoints: [],
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      repositoryLink: "https://github.com/johndoe/ecommerce-platform",
      liveDemoLink: "https://ecommerce.johndoeportfolio.com",
      role: "Lead Developer",
      startDate: "2021-01",
      endDate: "2021-12"
    },
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Advanced" }
  ],
  awards: [
    {
      title: "Employee of the Year",
      issuer: "Tech Innovators Inc.",
      date: "2018-12",
      description: "Recognized for outstanding performance and contributions to major projects."
    }
  ],
  volunteerExperience: [
    {
      role: "Volunteer Developer",
      organization: "Open Source Initiative",
      location: "Remote",
      startDate: "2017-03",
      endDate: "Present",
      responsibilities: [
        "Contribute to open-source projects by adding new features and fixing bugs.",
        "Collaborate with a global team of developers to enhance software functionality."
      ]
    }
  ],
  references: [
    {
      name: "Jane Smith",
      jobTitle: "Engineering Manager",
      company: "Tech Innovators Inc.",
      email: "jane.smith@techinnovators.com",
      phone: "+1 (555) 987-6543",
      relationship: "Former Manager"
    },
    {
      name: "Michael Brown",
      jobTitle: "Senior Developer",
      company: "Creative Solutions LLC",
      email: "michael.brown@creativesolutions.com",
      phone: "+1 (555) 654-3210",
      relationship: "Colleague"
    },
  ],
  achievements: [],
  interests: ['Chess', 'Traveling'],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // Personal Information
    updatePersonalInfo: (state, action: PayloadAction<typeof initialState.personalInformation>) => {
      state.personalInformation = action.payload;
    },

    // Work Experience
    addWorkExperience: (state, action: PayloadAction<typeof initialState.workExperience[0]>) => {
      state.workExperience.push(action.payload);
    },
    editWorkExperience: (state, action: PayloadAction<{ index: number; field: keyof typeof initialState.workExperience[0]; value: any }>) => {
      const { index, field, value } = action.payload;
      state.workExperience[index] = { ...state.workExperience[index], [field]: value };
    },
    removeWorkExperience: (state, action: PayloadAction<number>) => {
      state.workExperience = state.workExperience.filter((_, index) => index !== action.payload);
    },

    // Education
    addEducation: (state, action: PayloadAction<typeof initialState.education[0]>) => {
      state.education.push(action.payload);
    },
    editEducation: (state, action: PayloadAction<{ index: number; field: keyof typeof initialState.education[0]; value: string }>) => {
      const { index, field, value } = action.payload;
      state.education[index] = { ...state.education[index], [field]: value };
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.education = state.education.filter((_, index) => index !== action.payload);
    },

    // Skills
    addSkill: (state, action: PayloadAction<typeof initialState.skills[0]>) => {
      state.skills.push(action.payload);
    },
    editSkill: (state, action: PayloadAction<{ index: number; name?: string; proficiency?: number }>) => {
      const { index, ...changes } = action.payload;
      state.skills[index] = { ...state.skills[index], ...changes };
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills = state.skills.filter((_, index) => index !== action.payload);
    },

    // Projects
    addProject: (state, action: PayloadAction<typeof initialState.projects[0]>) => {
      state.projects.push(action.payload);
    },
    editProject: (state, action: PayloadAction<{ index: number; field: keyof typeof initialState.projects[0]; value: any }>) => {
      const { index, field, value } = action.payload;
      state.projects[index] = { ...state.projects[index], [field]: value };
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter((_, index) => index !== action.payload);
    },

    // Languages
    addLanguage: (state, action: PayloadAction<typeof initialState.languages[0]>) => {
      state.languages.push(action.payload);
    },
    editLanguage: (state, action: PayloadAction<{ index: number; field: keyof typeof initialState.languages[0]; value: string }>) => {
      const { index, field, value } = action.payload;
      state.languages[index] = { ...state.languages[index], [field]: value };
    },
    removeLanguage: (state, action: PayloadAction<number>) => {
      state.languages = state.languages.filter((_, index) => index !== action.payload);
    },

    // Achievements
    addAchievement: (state, action: PayloadAction<any>) => {
      state.achievements.push(action.payload);
    },
    editAchievement: (state, action: PayloadAction<{ index: number; field: string; value: string }>) => {
      const { index, field, value } = action.payload;
      state.achievements[index] = { ...state.achievements[index], [field]: value };
    },
    removeAchievement: (state, action: PayloadAction<number>) => {
      state.achievements = state.achievements.filter((_, index) => index !== action.payload);
    },

    // Interests
    addInterest: (state, action: PayloadAction<string>) => {
      state.interests.push(action.payload);
    },
    editInterest: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      state.interests[index] = value;
    },
    removeInterest: (state, action: PayloadAction<number>) => {
      state.interests = state.interests.filter((_, index) => index !== action.payload);
    },

    // References
    addReference: (state, action: PayloadAction<typeof initialState.references[0]>) => {
      state.references.push(action.payload);
    },
    editReference: (state, action: PayloadAction<{ index: number; field: keyof typeof initialState.references[0]; value: string }>) => {
      const { index, field, value } = action.payload;
      state.references[index] = { ...state.references[index], [field]: value };
    },
    removeReference: (state, action: PayloadAction<number>) => {
      state.references = state.references.filter((_, index) => index !== action.payload);
    },

    // Awards
    addAward: (state, action: PayloadAction<typeof initialState.awards[0]>) => {
      state.awards.push(action.payload);
    },
    editAward: (state, action: PayloadAction<{ index: number; field: keyof typeof initialState.awards[0]; value: string }>) => {
      const { index, field, value } = action.payload;
      state.awards[index] = { ...state.awards[index], [field]: value };
    },
    removeAward: (state, action: PayloadAction<number>) => {
      state.awards = state.awards.filter((_, index) => index !== action.payload);
    },

    // Certifications
    addCertification: (state, action: PayloadAction<typeof initialState.certifications[0]>) => {
      state.certifications.push(action.payload);
    },
    editCertification: (state, action: PayloadAction<{ index: number; field: keyof typeof initialState.certifications[0]; value: string }>) => {
      const { index, field, value } = action.payload;
      state.certifications[index] = { ...state.certifications[index], [field]: value };
    },
    removeCertification: (state, action: PayloadAction<number>) => {
      state.certifications = state.certifications.filter((_, index) => index !== action.payload);
    },

    // Volunteer Experience
    addVolunteerExperience: (state, action: PayloadAction<typeof initialState.volunteerExperience[0]>) => {
      state.volunteerExperience.push(action.payload);
    },
    editVolunteerExperience: (state, action: PayloadAction<{ index: number; field: keyof typeof initialState.volunteerExperience[0]; value: any }>) => {
      const { index, field, value } = action.payload;
      state.volunteerExperience[index] = { ...state.volunteerExperience[index], [field]: value };
    },
    removeVolunteerExperience: (state, action: PayloadAction<number>) => {
      state.volunteerExperience = state.volunteerExperience.filter((_, index) => index !== action.payload);
    },

    // Update entire sections
    updateWorkExperience: (state, action: PayloadAction<typeof initialState.workExperience>) => {
      state.workExperience = action.payload;
    },
    updateEducation: (state, action: PayloadAction<typeof initialState.education>) => {
      state.education = action.payload;
    },
    updateSkills: (state, action: PayloadAction<typeof initialState.skills>) => {
      state.skills = action.payload;
    },
    updateCertifications: (state, action: PayloadAction<typeof initialState.certifications>) => {
      state.certifications = action.payload;
    },
    updateProjects: (state, action: PayloadAction<typeof initialState.projects>) => {
      state.projects = action.payload;
    },
    updateLanguages: (state, action: PayloadAction<typeof initialState.languages>) => {
      state.languages = action.payload;
    },
    updateAwards: (state, action: PayloadAction<typeof initialState.awards>) => {
      state.awards = action.payload;
    },
    updateVolunteerExperience: (state, action: PayloadAction<typeof initialState.volunteerExperience>) => {
      state.volunteerExperience = action.payload;
    },
    updateReferences: (state, action: PayloadAction<typeof initialState.references>) => {
      state.references = action.payload;
    },
    updateAchievements: (state, action: PayloadAction<typeof initialState.achievements>) => {
      state.achievements = action.payload;
    },
    updateInterests: (state, action: PayloadAction<typeof initialState.interests>) => {
      state.interests = action.payload;
    },
  }
});

export const {
  // Personal Information
  updatePersonalInfo,
  // Work Experience
  addWorkExperience,
  editWorkExperience,
  removeWorkExperience,
  updateWorkExperience,
  // Education
  addEducation,
  editEducation,
  removeEducation,
  updateEducation,
  // Skills
  addSkill,
  editSkill,
  removeSkill,
  updateSkills,
  // Projects
  addProject,
  editProject,
  removeProject,
  updateProjects,
  // Languages
  addLanguage,
  editLanguage,
  removeLanguage,
  updateLanguages,
  // Achievements
  addAchievement,
  editAchievement,
  removeAchievement,
  updateAchievements,
  // Interests
  addInterest,
  editInterest,
  removeInterest,
  updateInterests,
  // References
  addReference,
  editReference,
  removeReference,
  updateReferences,
  // Awards
  addAward,
  editAward,
  removeAward,
  updateAwards,
  // Certifications
  addCertification,
  editCertification,
  removeCertification,
  updateCertifications,
  // Volunteer Experience
  addVolunteerExperience,
  editVolunteerExperience,
  removeVolunteerExperience,
  updateVolunteerExperience,
} = resumeSlice.actions;

export default resumeSlice.reducer;