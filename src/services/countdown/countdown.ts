import { db } from "@/firebaseConfig/config";
import { doc, getDoc, setDoc, FirestoreError } from "firebase/firestore";

export interface CountdownData {
  targetDate: string; // ISO string format
  title: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const handleFirestoreError = (error: FirestoreError) => {
  console.error("Firestore Error:", error.code, error.message);
  throw new Error(`Database error: ${error.message}`);
};

// Fetch countdown data from Firebase
export const getCountdownData = async (): Promise<CountdownData | null> => {
  try {
    const docRef = doc(db, "countdown", "igcse-offer");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as CountdownData;
    } else {
      // If no countdown exists, create a default one (20 days from now)
      const defaultCountdown = await createDefaultCountdown();
      return defaultCountdown;
    }
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return null;
  }
};

// Create a default countdown (20 days from now)
const createDefaultCountdown = async (): Promise<CountdownData> => {
  const now = new Date();
  const targetDate = new Date(now.getTime() + (20 * 24 * 60 * 60 * 1000)); // 20 days from now
  
  const countdownData: CountdownData = {
    targetDate: targetDate.toISOString(),
    title: "🚀 IGCSE Early Bird Offer - Limited Time!",
    isActive: true,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };

  try {
    const docRef = doc(db, "countdown", "igcse-offer");
    await setDoc(docRef, countdownData);
    return countdownData;
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    throw error;
  }
};

// Update countdown data (admin function)
export const updateCountdownData = async (data: Partial<CountdownData>): Promise<void> => {
  try {
    const docRef = doc(db, "countdown", "igcse-offer");
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    await setDoc(docRef, updateData, { merge: true });
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    throw error;
  }
};