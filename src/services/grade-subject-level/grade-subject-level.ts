import {
  collection,
  doc,
  getDoc,
  getDocs,
  FirestoreError,
} from "firebase/firestore";
import { db } from "../../firebaseConfig/config";
import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";

export const getPageData = async (slug: string): Promise<PageData | null> => {
  // if (cachedPageData) return cachedPageData; // Use cached data if available

  try {
    const docRef = doc(db, "grade-subject-level", slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as PageData;
    } else {
      console.error("No such document for slug:", slug);
      return null;
    }
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return null;
  }
};

export const getPageSequence =
  async (): Promise<Component_Sequence_Type | null> => {
    try {
      const docRef = doc(db, "component-sequence", "grade-subject-level");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Component_Sequence_Type;
      } else {
        console.error("No such document in component-sequence.");
        return null;
      }
    } catch (error) {
      handleFirestoreError(error as FirestoreError);
      return null;
    }
  };

// Get all documents from a specific collection, and cache results

export const getAllDocumentsFromCollection = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      lastModified: doc.data().timestamp || null, // Ensure timestamp is handled correctly
    }));

    return documents;
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return null;
  }
};

// Centralized error handling to deal with Firestore errors
const handleFirestoreError = (error: FirestoreError) => {
  console.error("Firestore Error Code:", error.code);
  console.error("Firestore Error Message:", error.message);
  // Add custom retry logic if needed
};
