import { configureStore } from '@reduxjs/toolkit';
import activeSection from './activeSectionSlice';
import resume from './resumeSlice';
import settings from './settingsSlice';
import user from './userSlice';
import loading from './loadingSlice';

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
