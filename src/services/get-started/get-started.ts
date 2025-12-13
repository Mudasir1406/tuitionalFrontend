import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";
import { StaticImageData } from "next/image";

export const getStartedData = async (
  locale: string = "en"
): Promise<GetStartedData[]> => {
  // const temp: GetStartedData[] = [];
  // const queryData = await getDocs(collection(db, "get-started-v2"));
  // queryData.forEach((doc) => {
  //   temp.push({ id: doc.id, ...doc.data() } as GetStartedData);
  // });
  // return temp;
  const getStartedRef = collection(db, "get-started-v2");
  const snapshot = await getDocs(getStartedRef);

  const getStarted: GetStartedData[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (data[locale]) {
      getStarted.push({
        id: doc.id,
        ...data[locale],
      });
    }
  });
  return getStarted;
};

export type GetStartedData = {
  en: {
    id: string;
    heading: string;
    image: StaticImageData;
    description: string;
    ButtonText: string;
  };
  ar: {
    id: string;
    heading: string;
    image: StaticImageData;
    description: string;
    ButtonText: string;
  };
};
