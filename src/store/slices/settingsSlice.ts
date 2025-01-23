import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SectionConfig {
  id: string;
  title: string;
  visible: boolean;
  column: 'left' | 'right' | 'full';
  order: number;
}

export interface Template {
  id: string;
  name: string;
  personalDetailsStyle: {
    background: string;
    textColor: string;
    titleColor: string;
    summaryColor: string;
    contactsColor: string;
  };
  sectionStyle: {
    background: string;
    titleColor: string;
    contentColor: string;
  };
}

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    personalDetailsStyle: {
      background: 'bg-white',
      textColor: 'text-gray-900',
      titleColor: 'text-gray-700',
      summaryColor: 'text-gray-600',
      contactsColor: 'text-gray-700'
    },
    sectionStyle: {
      background: 'bg-white',
      titleColor: 'text-gray-900',
      contentColor: 'text-gray-700'
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    personalDetailsStyle: {
      background: 'bg-gray-900',
      textColor: 'text-white',
      titleColor: 'text-gray-200',
      summaryColor: 'text-gray-300',
      contactsColor: 'text-gray-300'
    },
    sectionStyle: {
      background: 'bg-white',
      titleColor: 'text-gray-900',
      contentColor: 'text-gray-700'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    personalDetailsStyle: {
      background: 'bg-gray-50',
      textColor: 'text-gray-900',
      titleColor: 'text-gray-700',
      summaryColor: 'text-gray-600',
      contactsColor: 'text-gray-600'
    },
    sectionStyle: {
      background: 'bg-white',
      titleColor: 'text-gray-900',
      contentColor: 'text-gray-600'
    }
  },
  {
    id: 'bold',
    name: 'Bold',
    personalDetailsStyle: {
      background: 'bg-blue-900',
      textColor: 'text-white',
      titleColor: 'text-blue-200',
      summaryColor: 'text-blue-100',
      contactsColor: 'text-blue-200'
    },
    sectionStyle: {
      background: 'bg-white',
      titleColor: 'text-blue-900',
      contentColor: 'text-gray-700'
    }
  }
];

interface SettingsState {
  font: string;
  theme: string;
  template: string;
  sections: SectionConfig[];
}

const initialSections: SectionConfig[] = [
  { id: 'personalDetails', title: 'Personal Details', visible: true, column: 'full', order: 0 },
  { id: 'skills', title: 'Skills', visible: true, column: 'left', order: 1 },
  { id: 'education', title: 'Education', visible: true, column: 'left', order: 2 },
  { id: 'experience', title: 'Professional Experience', visible: true, column: 'left', order: 3 },
  { id: 'achievements', title: 'Achievements', visible: false, column: 'left', order: 4 },
  { id: 'certifications', title: 'Certifications', visible: false, column: 'right', order: 5 },
  { id: 'awards', title: 'Awards', visible: false, column: 'right', order: 6 },
  { id: 'volunteer', title: 'Volunteer Experience', visible: false, column: 'right', order: 7 },
  { id: 'interests', title: 'Interests', visible: true, column: 'right', order: 8 },
  { id: 'languages', title: 'Languages', visible: true, column: 'right', order: 9 },
  { id: 'projects', title: 'Projects', visible: true, column: 'right', order: 10 },
  { id: 'references', title: 'References', visible: false, column: 'right', order: 11 }
];

const initialState: SettingsState = {
  font: 'Roboto',
  theme: '#3b82f6',
  template: 'modern',
  sections: initialSections
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setFont: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setTemplate: (state, action: PayloadAction<string>) => {
      state.template = action.payload;
    },
    toggleSectionVisibility: (state, action: PayloadAction<string>) => {
      const section = state.sections.find(s => s.id === action.payload);
      if (section) {
        section.visible = !section.visible;
      }
    },
    updateSectionOrder: (state, action: PayloadAction<SectionConfig[]>) => {
      state.sections = action.payload;
    },
    moveSection: (state, action: PayloadAction<{ id: string; column: 'left' | 'right' }>) => {
      const section = state.sections.find(s => s.id === action.payload.id);
      if (section && section.column !== 'full') {
        section.column = action.payload.column;
      }
    }
  },
});

export const {
  setFont,
  setTheme,
  setTemplate,
  toggleSectionVisibility,
  updateSectionOrder,
  moveSection
} = settingsSlice.actions;

export default settingsSlice.reducer;
