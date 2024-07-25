import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";

export const getTrustedSchools = async (): Promise<Trusted_Schools_Type> => {
  let temp: Trusted_Schools_Type = {
    images: [],
    id: "",
  };
  const queryData = await getDocs(collection(db, "trusted-schools"));
  queryData.forEach((doc) => {
    temp = { id: doc.id, ...doc.data() } as Trusted_Schools_Type;
  });
  return temp;
};

export type Trusted_Schools_Type = {
  images: string[];
  id: string;
};
