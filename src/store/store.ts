import { configureStore } from '@reduxjs/toolkit';
import activeSection from './slices/activeSectionSlice';
import resume from './slices/resumeSlice';
import settings from './slices/settingsSlice';
import user from './slices/userSlice';
import loading from './slices/loadingSlice';

const store = configureStore({
  reducer: {
    activeSection,
    resume,
    settings,
    user,
    loading,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
