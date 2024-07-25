import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";
import { StaticImageData } from "next/image";

export const getStartedData = async (): Promise<GetStartedData[]> => {
  const temp: GetStartedData[] = [];
  const queryData = await getDocs(collection(db, "get-started"));
  queryData.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() } as GetStartedData);
  });
  return temp;
};

export type GetStartedData = {
  id: string;
  heading: string;
  image: StaticImageData;
  description: string;
};
