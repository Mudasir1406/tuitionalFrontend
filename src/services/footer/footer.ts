import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";

export const getFooterData = async (locale: string = 'en'): Promise<FooterData> => {
  let temp: FooterData = {
    id: "",
    aboutUs: [],
    curriculums: [],
    getHelp: [],
    subjects: [],
    link: {
      facebook: "",
      insta: "",
      linkdin: "",
    },
  };
  
  try {
    const queryData = await getDocs(collection(db, "footer-v2"));
    queryData.forEach((doc) => {
      const data = doc.data();
      temp = {
        id: doc.id,
        // Extract language-specific arrays, fallback to English if Arabic not available
        aboutUs: data.aboutUs?.[locale] || data.aboutUs?.en || [],
        curriculums: data.curriculums?.[locale] || data.curriculums?.en || [],
        getHelp: data.getHelp?.[locale] || data.getHelp?.en || [],
        subjects: data.subjects?.[locale] || data.subjects?.en || [],
        // Social links remain the same for all languages
        link: data.link || {
          facebook: "",
          insta: "",
          linkdin: "",
        },
      };
    });
  } catch (error) {
    console.error("Error fetching footer data:", error);
  }
  
  return temp;
};
export type FooterData = {
  id: string;
  aboutUs: string[];
  curriculums: string[];
  getHelp: string[];
  subjects: string[];
  link: {
    facebook: string;
    insta: string;
    linkdin: string;
  };
};
