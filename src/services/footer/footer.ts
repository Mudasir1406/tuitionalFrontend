import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";

export const getFooterData = async (): Promise<FooterData> => {
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
  const queryData = await getDocs(collection(db, "footer"));
  queryData.forEach((doc) => {
    temp = { id: doc.id, ...doc.data() } as FooterData;
  });
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
