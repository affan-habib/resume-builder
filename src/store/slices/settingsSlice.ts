import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SectionConfig {
  id: string;
  title: string;
  visible: boolean;
  column: 'left' | 'right' | 'full';
  order: number;
}

interface SettingsState {
  font: string;
  sections: SectionConfig[];
}

const initialSections: SectionConfig[] = [
  { id: 'personalDetails', title: 'Personal Details', visible: true, column: 'full', order: 0 },
  { id: 'skills', title: 'Skills', visible: true, column: 'left', order: 1 },
  { id: 'education', title: 'Education', visible: true, column: 'left', order: 2 },
  { id: 'experience', title: 'Professional Experience', visible: true, column: 'left', order: 3 },
  { id: 'achievements', title: 'Achievements', visible: true, column: 'left', order: 4 },
  { id: 'certifications', title: 'Certifications', visible: true, column: 'right', order: 5 },
  { id: 'awards', title: 'Awards', visible: true, column: 'right', order: 6 },
  { id: 'volunteer', title: 'Volunteer Experience', visible: true, column: 'right', order: 7 },
  { id: 'interests', title: 'Interests', visible: true, column: 'right', order: 8 },
  { id: 'languages', title: 'Languages', visible: true, column: 'right', order: 9 },
  { id: 'projects', title: 'Projects', visible: true, column: 'right', order: 10 },
  { id: 'references', title: 'References', visible: true, column: 'right', order: 11 }
];

const initialState: SettingsState = {
  font: 'Roboto',
  sections: initialSections
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setFont: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
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
  toggleSectionVisibility,
  updateSectionOrder,
  moveSection
} = settingsSlice.actions;

export default settingsSlice.reducer;
