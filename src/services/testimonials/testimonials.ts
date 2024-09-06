import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";
import { StaticImageData } from "next/image";

export const getTestimonials = async (): Promise<Testimonials_Type[]> => {
  let temp: Testimonials_Type[] = [];
  const queryData = await getDocs(collection(db, "testimonials"));
  queryData.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() } as Testimonials_Type);
  });
  return temp;
};

export type Testimonials_Type = {
  country: string;
  rating: number;
  imageUrl: string;
  userName: string;
  message: string;
  images?: StaticImageData;
  id: string;
};
