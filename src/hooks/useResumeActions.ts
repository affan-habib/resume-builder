import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/auth/firebase"; // Firebase configuration
import { updateResume } from "@/store/slices/resumeSlice";
import { RootState } from "@/store/store";

export const useResumeManager = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user); // User state
  const resume = useSelector((state: RootState) => state.resume); // Resume state

  // Fetch resume data once and update Redux store
  const fetchResume = async () => {
    try {
      if (!user.uid) throw new Error("User ID not found.");
      const docRef = doc(db, "resumes", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.resume) {
          dispatch(updateResume(data.resume)); // Update Redux state
          console.log("Resume data fetched successfully!");
        } else {
          console.warn("No resume data found for the user.");
        }
      } else {
        console.warn("No document found for the user.");
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  // Update resume data in Firestore using the Redux store state
  const updateResumeData = async () => {
    try {
      if (!user.uid) throw new Error("User ID not found.");
      const docRef = doc(db, "resumes", user.uid);
      await setDoc(docRef, { resume }, { merge: true }); // Automatically use Redux store state
      console.log("Resume data updated successfully!");
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };

  // Periodically update resume data after fetching it once
  useEffect(() => {
    // Fetch resume once on mount
    fetchResume();
  }, []); // Run effect when user ID or resume changes

  return {
    fetchResume, // Available in case you want to fetch manually
    updateResumeData,
  };
};
