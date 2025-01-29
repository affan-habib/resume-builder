import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/auth/firebase"; // Firebase configuration
import { updateResume } from "@/store/slices/resumeSlice";
import { RootState } from "@/store/store";

export const useResumeManager = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user); // User state
  const resume = useSelector((state: RootState) => state.resume); // Resume state
  const [isSaving, setIsSaving] = useState(false); // Track saving state to prevent multiple calls

  // Fetch resume data once and update Redux store
  const fetchResume = async () => {
    try {
      if (!user.uid) throw new Error("User ID not found.");
      const docRef = doc(db, "resumes", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data?.resume) {
          dispatch(updateResume(data.resume)); // Update Redux state with fetched data
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
    if (isSaving) return; // Prevent multiple API calls if already saving
    setIsSaving(true);

    try {
      if (!user.uid) throw new Error("User ID not found.");
      const docRef = doc(db, "resumes", user.uid);
      await setDoc(docRef, { resume }, { merge: true }); // Use Redux store state to update Firestore
      console.log("Resume data updated successfully!");
    } catch (error) {
      console.error("Error updating resume:", error);
    } finally {
      setIsSaving(false); // Reset the saving state after the update
    }
  };

  // Periodically update resume data (once every minute) or on specific triggers
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (resume) {
        updateResumeData(); // Call the update function periodically (e.g., every minute)
      }
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [resume]); // Only run if the resume data changes

  // Fetch resume once when the user component mounts
  useEffect(() => {
    if (user?.uid) {
      fetchResume(); // Fetch resume when user ID is available
    }
  }, [user?.uid]); // This will rerun when the user.uid changes

  return {
    fetchResume, // Available if you want to manually fetch
    updateResumeData,
    isSaving, // Indicate if the data is being saved to avoid multiple triggers
  };
};
