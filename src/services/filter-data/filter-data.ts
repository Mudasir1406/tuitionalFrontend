import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";

export const getFilterData = async (): Promise<Filter_Data> => {
  let temp: Filter_Data = {
    curriculum: [],
    grade: [],
    subject: [],
    type: [],
    id: "",
  };
  const queryData = await getDocs(collection(db, "filter"));
  queryData.forEach((doc) => {
    temp = { id: doc.id, ...doc.data() } as Filter_Data;
  });
  return temp as Filter_Data;
};

export type Filter_Data = {
  curriculum: string[];
  grade: string[];
  subject: string[];
  type: string[];
  id: string;
};
