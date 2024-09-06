import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";

export const getVideoReviews = async (): Promise<Video_Reviews_Type[]> => {
  let temp: Video_Reviews_Type[] = [];
  const queryData = await getDocs(collection(db, "video-reviews"));
  queryData.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() } as Video_Reviews_Type);
  });
  return temp;
};

export type Video_Reviews_Type = {
  video: string;
  country: string;
  thumbnil: string;
  isSelected: string;
  name: string;
  id: string;
};
