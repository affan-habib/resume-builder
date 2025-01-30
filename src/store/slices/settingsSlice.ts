import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sectionStylesMap, SectionStyles } from '@/styles/sectionStyles';
import { personalDetailsStylesMap, PersonalDetailsStyle } from '@/styles/personalDetailsStyles';

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
  personalDetailsStyle: PersonalDetailsStyle;
  sectionStyle: SectionStyles;
}

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    personalDetailsStyle: personalDetailsStylesMap['modern'],
    sectionStyle: sectionStylesMap['modern'],
  },
  {
    id: 'professional',
    name: 'Professional',
    personalDetailsStyle: personalDetailsStylesMap['professional'],
    sectionStyle: sectionStylesMap['professional'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    personalDetailsStyle: personalDetailsStylesMap['minimal'],
    sectionStyle: sectionStylesMap['minimal'],
  },
  {
    id: 'bold',
    name: 'Bold',
    personalDetailsStyle: personalDetailsStylesMap['bold'],
    sectionStyle: sectionStylesMap['bold'],
  },
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
  sections: initialSections,
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
      const section = state.sections.find((s) => s.id === action.payload);
      if (section) {
        section.visible = !section.visible;
      }
    },
    updateSectionOrder: (state, action: PayloadAction<SectionConfig[]>) => {
      state.sections = action.payload;
    },
    moveSection: (
      state,
      action: PayloadAction<{ id: string; column: 'left' | 'right' }>
    ) => {
      const section = state.sections.find((s) => s.id === action.payload.id);
      if (section && section.column !== 'full') {
        section.column = action.payload.column;
      }
    },
  },
});

export const {
  setFont,
  setTheme,
  setTemplate,
  toggleSectionVisibility,
  updateSectionOrder,
  moveSection,
} = settingsSlice.actions;

export default settingsSlice.reducer;
