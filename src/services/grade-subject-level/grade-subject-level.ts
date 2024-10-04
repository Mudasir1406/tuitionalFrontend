import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";
import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";

export const getPageData = async (slug: string) => {
  try {
    const docRef = doc(db, "grade-subject-level", slug);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as PageData;
  } catch (error) {
    console.log(error);
  }
};
export const getPageSequence = async () => {
  try {
    const docRef = doc(db, "component-sequence", "grade-subject-level");
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Component_Sequence_Type;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDocumentsFromCollection = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      lastModified: doc.data().timestamp,
    }));

    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return null;
  }
};
