import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
   uid: string | null;
   displayName: string | null;
   email: string | null;
   photoURL: string | null;
}

const loadUserFromLocalStorage = (): UserState => {
   const storedUser = localStorage.getItem("user");
   return storedUser
      ? JSON.parse(storedUser)
      : { uid: null, displayName: null, email: null, photoURL: null };
};

const initialState: UserState = loadUserFromLocalStorage();

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<UserState>) => {
         localStorage.setItem("user", JSON.stringify(action.payload));
         return action.payload;
      },
      clearUser: () => {
         localStorage.removeItem("user");
         return { uid: null, displayName: null, email: null, photoURL: null };
      },
   },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
