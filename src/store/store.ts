import { configureStore } from '@reduxjs/toolkit';
import activeSection from './slices/activeSectionSlice';
import resume from './slices/resumeSlice';
import settings from './slices/settingsSlice';
import user from './slices/userSlice';
import loading from './slices/loadingSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Define persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'resume', 'settings'],
};

// Combine reducers
const rootReducer = combineReducers({
  activeSection,
  resume,
  settings,
  user,
  loading,
});

// Create a persisted reducer using the persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
