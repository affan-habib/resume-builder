// src/Authentication/authFunctions.js
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { setUser } from "../store/slices/userSlice";

export const signInWithGoogle = async (dispatch) => {
   try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userData = {
         uid: user.uid,
         displayName: user.displayName,
         email: user.email,
         photoURL: user.photoURL,
      };
      dispatch(setUser(userData));
      return user;
   } catch (error) {
      console.error("Error during Google Sign-In:", error);
      throw error;
   }
};
