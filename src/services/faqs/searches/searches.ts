import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig/config";

export const getSearches = async (): Promise<Searches_Type[]> => {
  const temp: Searches_Type[] = [];
  const queryData = await getDocs(collection(db, "popular-searches"));
  queryData.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() } as Searches_Type);
  });
  return temp;
};

export type Searches_Type = {
  id: string;
  isPremium: boolean;
  type: string;
  keyword: string;
};
