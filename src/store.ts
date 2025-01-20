import { configureStore } from "@reduxjs/toolkit";
import activeSectionReducer from "./activeSectionSlice";
import resumeReducer from "./resumeSlice";
import userReducer from "./userSlice";

const store = configureStore({
   reducer: {
      activeSection: activeSectionReducer,
      user: userReducer,
      resume: resumeReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
