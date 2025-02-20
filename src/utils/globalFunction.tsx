import { db } from "@/firebaseConfig/config";
import { addDoc, collection } from "firebase/firestore";

export const addFormData = async (
  formType: "careers" | "contact" | "lead",
  formData: any
) => {
  try {
    const docRef = await addDoc(
      collection(db, `tuitional-forms/${formType}/form`),
      formData
    );
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
