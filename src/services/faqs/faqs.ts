import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";

export const getFaqs = async (locale: string = "en"): Promise<Faqs_Type[]> => {
  // let temp: Faqs_Type[] = [];
  // const queryData = await getDocs(collection(db, "faqs-v2"));
  // queryData.forEach((doc) => {
  //   temp.push({ id: doc.id, ...doc.data() } as Faqs_Type);
  // });
  // return temp;
  const faqsRef = collection(db, "faq-v2");
  const snapshot = await getDocs(faqsRef);

  const faqs: Faqs_Type[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (data[locale]) {
      faqs.push({
        id: doc.id,
        ...data[locale],
      });
    }
  });
  return faqs;
};

export type Faqs_Type = {
  // en: {
  id: string;
  question: string;
  answer: string;
  // };
  // ar: {
  // id: string;
  // question: string;
  // answer: string;
  // };
};
