import { configureStore } from '@reduxjs/toolkit';
import activeSectionReducer from './activeSectionSlice';

const store = configureStore({
  reducer: {
    activeSection: activeSectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
