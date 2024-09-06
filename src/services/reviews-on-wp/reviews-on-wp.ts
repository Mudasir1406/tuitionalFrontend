import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";
import { StaticImageData } from "next/image";

export const getWPReviews = async (): Promise<WP_Reviews_Type[]> => {
  let temp: WP_Reviews_Type[] = [];
  const queryData = await getDocs(collection(db, "reviews-on-wp"));
  queryData.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() } as WP_Reviews_Type);
  });
  return temp;
};

export type WP_Reviews_Type = {
  audio: string;
  imageUrl: string;
  name: string;
  id: string;
};
