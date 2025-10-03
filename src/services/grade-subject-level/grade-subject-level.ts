import {
  collection,
  doc,
  getDoc,
  getDocs,
  FirestoreError,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig/config";
import {
  AllBlogsData,
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";

// export const getAllBlogsData = async (): Promise<AllBlogsData | null> => {
//   // if (cachedPageData) return cachedPageData; // Use cached data if available

//   try {
//     const docRef = doc(db, "blogs");
//     const docSnap = await getDoc(docRef);
//     console.error("docSnap:", docSnap);
//     if (docSnap.exists()) {
//       return docSnap.data() as PageData;
//     } else {
//       console.error("No such document for slug:");
//       return null;
//     }
//   } catch (error) {
//     handleFirestoreError(error as FirestoreError);
//     return null;
//   }
// };

export const getDocumentsByName = async (collectionName: string) => {
  try {
    // console.log("fetching Blogs");
    const querySnapshot = await getDocs(collection(db, collectionName));

    const documents: any = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Spread the document data
    }));
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return null;
  }
};

export const getBlogs = async (locale: string = "en") => {
  try {
    let collectionName = "blogs-v1-en";
    if (locale === "ar") {
      collectionName = "blogs-v1-ar";
    } else if (locale === "es") {
      collectionName = "blogs-v1-es";
    }
    
    const querySnapshot = await getDocs(collection(db, collectionName));
    
    const documents: any = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Spread the document data
    }));
    
    return documents;
  } catch (error) {
    console.error("Error getting blog documents: ", error);
    return null;
  }
};

export const getPageData = async (slug: string, locale: string = "en"): Promise<PageData | null> => {
  // if (cachedPageData) return cachedPageData; // Use cached data if available

  try {
    const collectionName = locale === "ar" ? "grade-subject-level-ar" : "grade-subject-level-en";
    const docRef = doc(db, collectionName, slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as PageData;
    } else {
      console.error("No such document for slug:", slug, "in collection:", collectionName);
      return null;
    }
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return null;
  }
};
export const getBlogData = async (slug: string, locale: string = "en"): Promise<PageData | null> => {
  // if (cachedPageData) return cachedPageData; // Use cached data if available

  try {
    let collectionName = "blogs-v1-en";
    if (locale === "ar") {
      collectionName = "blogs-v1-ar";
    } else if (locale === "es") {
      collectionName = "blogs-v1-es";
    }
    const docRef = doc(db, collectionName, slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as PageData;
      return data;
    } else {
      console.error("No such document for slug:", slug, "in collection:", collectionName);
      return null;
    }
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return null;
  }
};

interface GroupDocument {
  id: string;
  [key: string]: any; // Allow for any other fields in the document
}

// export const getTutorsByFilter = async (curiculum: string, subject: string):  Promise<GroupDocument[]> => {
//   // if (cachedPageData) return cachedPageData; // Use cached data if available

//   const query1 = query(
//     collection(db, "tutors_data"),
//     where("Curiculum", "array-contains", curiculum)
//   );

//   // Query for the second condition
//   const query2 = query(
//     collection(db, "tutors_data"),
//     where("Subjects", "array-contains", subject)
//   );

//   // Execute the queries
//   const [snapshot1, snapshot2] = await Promise.all([getDocs(query1), getDocs(query2)]);

//   // Combine the results
//   const resultSet = new Set<string>();

//   snapshot1.forEach(doc => resultSet.add(JSON.stringify({ id: doc.id, ...doc.data() })));
//   snapshot2.forEach(doc => resultSet.add(JSON.stringify({ id: doc.id, ...doc.data() })));

//   // Convert the result set back to an array of objects
//   const results: GroupDocument[] = Array.from(resultSet).map((item) => JSON.parse(item));
//   console.log("Results for Tutors : ",results)
//   return results;
// };

export const getTutorsByFilter = async (
  curiculum: string,
  subject: string,
  locale: string = "en"
): Promise<GroupDocument[]> => {
  // Use language-specific tutor collections
  const collectionName = locale === "ar" ? "tutors-data-ar" : "tutors-data-en";

  if (curiculum == "" && subject == "") {
    var temp: any = [];
    const queryData = await getDocs(collection(db, collectionName));
    queryData.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() } as any);
    });
    return temp;
  }

  const query1 = query(
    collection(db, collectionName),
    where("Curiculum", "array-contains", curiculum)
  );

  // Query for the second condition
  const query2 = query(
    collection(db, collectionName),
    where("Subjects", "array-contains", subject)
  );

  // Execute the queries
  const [snapshot1, snapshot2] = await Promise.all([
    getDocs(query1),
    getDocs(query2),
  ]);

  // Combine the results
  const resultSet = new Set<string>();

  snapshot1.forEach((doc) =>
    resultSet.add(JSON.stringify({ id: doc.id, ...doc.data() }))
  );
  snapshot2.forEach((doc) =>
    resultSet.add(JSON.stringify({ id: doc.id, ...doc.data() }))
  );

  // Convert the result set back to an array of objects
  const results: GroupDocument[] = Array.from(resultSet).map((item) =>
    JSON.parse(item)
  );
  return results;
};

export const getPageSequence =
  async (): Promise<Component_Sequence_Type | null> => {
    try {
      const docRef = doc(db, "component-sequence", "grade-subject-level");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Component_Sequence_Type;
      } else {
        console.error("No such document in component-sequence.");
        return null;
      }
    } catch (error) {
      handleFirestoreError(error as FirestoreError);
      return null;
    }
  };

// Get all documents from a specific collection, and cache results

export const getAllDocumentsFromCollection = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      lastModified: doc.data().timestamp || null, // Ensure timestamp is handled correctly
    }));

    return documents;
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return null;
  }
};

// Centralized error handling to deal with Firestore errors
const handleFirestoreError = (error: FirestoreError) => {
  console.error("Firestore Error Code:", error.code);
  console.error("Firestore Error Message:", error.message);
  // Add custom retry logic if needed
};
