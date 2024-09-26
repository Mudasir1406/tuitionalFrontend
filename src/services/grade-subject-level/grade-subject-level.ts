import { doc, getDoc } from "firebase/firestore";
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
