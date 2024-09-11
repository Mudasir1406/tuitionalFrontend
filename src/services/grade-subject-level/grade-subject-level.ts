import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";

export const getPageData = async (slug: string) => {
  try {
    const docRef = doc(db, "grade-subject-level", slug);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
};
