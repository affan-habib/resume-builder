import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ResumeState } from './types/resume';

const initialState: ResumeState = {
  personalInformation: {
    name: "John Doe",
    title: "Senior Software Engineer",
    contact: {
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "San Francisco, CA, USA",
      linkedin: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoeportfolio.com"
    },
    summary: "Highly skilled Senior Software Engineer with over 10 years of experience in developing scalable web applications and leading cross-functional teams. Proficient in JavaScript, Python, and cloud technologies. Passionate about building innovative solutions and improving user experiences.",
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
      keyPoints: [], technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
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
    updatePersonalInfo: (state, action: PayloadAction<typeof initialState.personalInformation>) => {
      state.personalInformation = action.payload;
    },
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
  updatePersonalInfo,
  updateWorkExperience,
  updateEducation,
  updateSkills,
  updateCertifications,
  updateProjects,
  updateLanguages,
  updateAwards,
  updateVolunteerExperience,
  updateReferences,
  updateAchievements,
  updateInterests
} = resumeSlice.actions;

export default resumeSlice.reducer;