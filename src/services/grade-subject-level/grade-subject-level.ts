import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";
import { log } from "console";

export const getPageData = async (slug: string) => {
  try {
    const docRef = doc(db, "grade-subject-level", slug);
    const docSnap = await getDoc(docRef);
    //console.log(docSnap.data());
    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
};
