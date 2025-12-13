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
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const addFormDatav2 = async (
  formType: "lead-ppc",
  formData: any
) => {
  try {
    const docRef = await addDoc(
      collection(db, `tuitional-forms/${formType}/form`),
      formData
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
