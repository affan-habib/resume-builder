import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActiveSectionState {
  activeSection: string | null;
}

const initialState: ActiveSectionState = {
  activeSection: null,
};

const activeSectionSlice = createSlice({
  name: 'activeSection',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string | null>) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = activeSectionSlice.actions;

export default activeSectionSlice.reducer;
