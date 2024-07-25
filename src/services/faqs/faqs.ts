import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";

export const getFaqs = async (): Promise<Faqs_Type[]> => {
  let temp: Faqs_Type[] = [];
  const queryData = await getDocs(collection(db, "faqs"));
  queryData.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() } as Faqs_Type);
  });
  return temp;
};

export type Faqs_Type = {
  id: string;
  question: string;
  answer: string;
};
