import { db } from "@/firebaseConfig/config";
import { doc, getDoc, setDoc, FirestoreError } from "firebase/firestore";

export interface CountdownData {
  targetDate: string; // ISO string format
  title: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PageType = 'igcse' | 'gcse' | 'a-level';

interface PageConfig {
  title: string;
  docId: string;
}

const PAGE_CONFIGS: Record<PageType, PageConfig> = {
  'igcse': {
    title: '🚀 IGCSE Early Bird Offer - Limited Time!',
    docId: 'igcse-offer'
  },
  'gcse': {
    title: '🚀 GCSE Early Bird Offer - Limited Time!',
    docId: 'gcse-offer'
  },
  'a-level': {
    title: '🚀 A-Level Early Bird Offer - Limited Time!',
    docId: 'a-level-offer'
  }
};

const handleFirestoreError = (error: FirestoreError) => {
  console.error("Firestore Error:", error.code, error.message);
  throw new Error(`Database error: ${error.message}`);
};

const getPageConfig = (pageType: PageType): PageConfig => {
  return PAGE_CONFIGS[pageType];
};

// Fetch countdown data from Firebase
export const getCountdownData = async (pageType: PageType = 'igcse'): Promise<CountdownData | null> => {
  try {
    const config = getPageConfig(pageType);
    const docRef = doc(db, "countdown", config.docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as CountdownData;
      return {
        ...data,
        title: config.title
      };
    } else {
      // If no countdown exists, create a default one (20 days from now)
      const defaultCountdown = await createDefaultCountdown(pageType);
      return defaultCountdown;
    }
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return null;
  }
};

// Create a default countdown (20 days from now)
const createDefaultCountdown = async (pageType: PageType = 'igcse'): Promise<CountdownData> => {
  const now = new Date();
  const targetDate = new Date(now.getTime() + (20 * 24 * 60 * 60 * 1000)); // 20 days from now
  const config = getPageConfig(pageType);
  
  const countdownData: CountdownData = {
    targetDate: targetDate.toISOString(),
    title: config.title,
    isActive: true,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };

  try {
    const docRef = doc(db, "countdown", config.docId);
    await setDoc(docRef, countdownData);
    return countdownData;
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    throw error;
  }
};

// Update countdown data (admin function)
export const updateCountdownData = async (data: Partial<CountdownData>, pageType: PageType = 'igcse'): Promise<void> => {
  try {
    const config = getPageConfig(pageType);
    const docRef = doc(db, "countdown", config.docId);
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

// Auto-restart countdown (when countdown reaches 0)
export const restartCountdown = async (pageType: PageType = 'igcse', daysToAdd: number = 20): Promise<CountdownData | null> => {
  try {
    const config = getPageConfig(pageType);
    const docRef = doc(db, "countdown", config.docId);

    // Check if countdown exists and has expired
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existingData = docSnap.data() as CountdownData;
      const existingTargetDate = new Date(existingData.targetDate);
      const now = new Date();

      // Only restart if countdown has actually expired
      if (existingTargetDate.getTime() > now.getTime()) {
        console.log("Countdown hasn't expired yet. Skipping restart.");
        return existingData;
      }
    }

    // Create new countdown
    const now = new Date();
    const newTargetDate = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));

    const newCountdownData: CountdownData = {
      targetDate: newTargetDate.toISOString(),
      title: config.title,
      isActive: true,
      createdAt: docSnap.exists() ? (docSnap.data() as CountdownData).createdAt : now.toISOString(),
      updatedAt: now.toISOString()
    };

    await setDoc(docRef, newCountdownData);
    console.log(`Countdown restarted for ${pageType}: ${daysToAdd} days from now`);

    return newCountdownData;
  } catch (error) {
    console.error("Error restarting countdown:", error);
    handleFirestoreError(error as FirestoreError);
    return null;
  }
};

// Check if countdown has expired
export const isCountdownExpired = (countdownData: CountdownData | null): boolean => {
  if (!countdownData) return true;

  const targetDate = new Date(countdownData.targetDate);
  const now = new Date();

  return targetDate.getTime() <= now.getTime();
};