import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  font: string;
}

const initialState: SettingsState = {
  font: 'Roboto', 
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setFont: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
    },
    undo: () => {
      console.log('Undo action triggered');
    },
    redo: () => {
      console.log('Redo action triggered');
    },
    changeTheme: () => {
      console.log('Theme change action triggered');
    },
    changeLayout: () => {
      console.log('Layout change action triggered');
    },
    download: () => {
      console.log('Download action triggered');
    },
  },
});

export const {
  setFont,
  undo,
  redo,
  changeTheme,
  changeLayout,
  download,
} = settingsSlice.actions;

export default settingsSlice.reducer;
