import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ResumeState } from '@/types/resume';

const initialState: ResumeState = {
  personalInformation: {
    name: "",
    title: "",
    profilePicture: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
    contact: {
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      portfolio: ""
    },
    summary: "",
  },
  workExperience: [
    {
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      responsibilities: [""],
    },
  ],
  education: [
    {
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      gpa: ""
    },
  ],
  skills: [
    { name: "", proficiency: 0 },
  ],
  certifications: [
    {
      name: "",
      issuer: "",
      startDate: "",
      endDate: ""
    },
  ],
  projects: [
    {
      name: "",
      keyPoints: [""],
      technologies: [""],
      repositoryLink: "",
      liveDemoLink: "",
      role: "",
      startDate: "",
      endDate: ""
    },
  ],
  languages: [
    { language: "", proficiency: "" }
  ],
  awards: [
    {
      title: "",
      issuer: "",
      date: "",
      description: ""
    }
  ],
  volunteerExperience: [
    {
      role: "",
      organization: "",
      location: "",
      startDate: "",
      endDate: "",
      responsibilities: [""]
    }
  ],
  references: [
    {
      name: "",
      jobTitle: "",
      company: "",
      email: "",
      phone: "",
      relationship: ""
    },
  ],
  achievements: [
    {
      title: "",
      description: ""
    }
  ],
  interests: [""],
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