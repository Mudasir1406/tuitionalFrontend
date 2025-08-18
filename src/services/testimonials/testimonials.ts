import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/config";
import { StaticImageData } from "next/image";

// export const getTestimonials = async (): Promise<Testimonials_Type[]> => {
export const getTestimonials = async (
  locale: string = "en"
): Promise<Testimonials_Type[]> => {
  const testimonialsRef = collection(db, "testimonials-v2");
  const snapshot = await getDocs(testimonialsRef);

  const testimonials: Testimonials_Type[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (data[locale]) {
      testimonials.push({
        id: doc.id,
        ...data[locale],
      });
    }
  });
  return testimonials;
};

export type Testimonials_Type = {
  // en: {
  country: string;
  rating: number;
  imageUrl: string;
  userName: string;
  message: string;
  images?: StaticImageData;
  id: string;
  // };
  // ar: {
  //   country: string;
  //   rating: number;
  //   imageUrl: string;
  //   userName: string;
  //   message: string;
  //   images?: StaticImageData;
  //   id: string;
  // };
};
