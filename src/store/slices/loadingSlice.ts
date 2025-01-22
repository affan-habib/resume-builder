import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ResumeState } from './types/resume';

interface LoadingState {
  sectionLoading: {
    [K in keyof ResumeState]?: boolean;
  };
}

const initialState: LoadingState = {
  sectionLoading: {}
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setSectionLoading: (
      state,
      action: PayloadAction<{ section: keyof ResumeState; isLoading: boolean }>
    ) => {
      state.sectionLoading[action.payload.section] = action.payload.isLoading;
    }
  }
});

export const { setSectionLoading } = loadingSlice.actions;
export default loadingSlice.reducer;