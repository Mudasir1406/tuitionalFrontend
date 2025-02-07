import BlogSequences from "@/components/blog/blogSequences/blog-sequences";
import {
  getBlogData,
  getDocumentsByName,
  getPageData,
  getPageSequence,
} from "@/services/grade-subject-level/grade-subject-level";
import {
  AllBlogsData,
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
import { redirect } from "next/navigation";
import React from "react";

const dumyData = {
  heroSection: {
    title: "Title for hero",
    tag: "H1",
    image: "url",
    imageAlt: "imageAlt",
    socialShare: true,
    categories: ["Study Material", "Texting"],
    sequenceNumber: 1,
  },

  blogContent: {
    title: "title for blog",
    tag: "h2",
    content: "base64 content / html content (quil output)",
    sequenceNumber: 5,
  },
  postCTA: {
    show: true,
    sequenceNumber: 6,
  },
  relatedBlogs: {
    show: true,
  },
  tag: {
    data: ["IGCSE", "GCSE", "IB", "AP", "EDEXCEL"],
    sequenceNumber: 7,
  },
};
export type TagItem = {
  data: { name: string; id: string }[]; // Change this type based on the actual structure
};
const Page = async ({ params }: { params: { slug: string } }) => {
  const [data, sequence, allBlogs, allTags, allCategories]: [
    PageData | undefined | null,
    Component_Sequence_Type | undefined | null,
    AllBlogsData[] | null | undefined,
    TagItem[],
    TagItem[]
  ] = await Promise.all([
    getBlogData(params.slug),
    getPageSequence(),
    getDocumentsByName("blogs"),
    getDocumentsByName("tags"),
    getDocumentsByName("categories"),
  ]);

  // console.log("Pagelevel", data, "data hero", "sequence", sequence);

  const sortJsonObjectBySequenceNumber = (jsonObject: {
    [key: string]: any;
  }): { [key: string]: any } => {
    // Convert the object to an array of key-value pairs
    const entries = Object.entries(jsonObject);

    // Sort the entries:
    const sortedEntries = entries.sort(([, valueA], [, valueB]) => {
      const seqA = valueA.sequenceNumber ?? Infinity; // If sequenceNumber is missing, assign Infinity
      const seqB = valueB.sequenceNumber ?? Infinity; // If sequenceNumber is missing, assign Infinity
      return seqA - seqB;
    });

    // Convert the sorted entries back into an object
    return Object.fromEntries(sortedEntries);
  };

  // if (!data) return redirect("/404");

  // if (!sequence) {
  //   return <div>Error: Component sequence not found.</div>;
  // }

  // if (data?.variant == "new") {
  return (
    <>
      {/* <BlogSequences
        data={sortJsonObjectBySequenceNumber(data ? data : dumyData) as any}
        allBlogs={allBlogs}
        allTags={allTags?.[0]?.data}
        allCategories={allCategories?.[0]?.data}
      /> */}
    </>
  );
  // }

  // return <GradeSubjectLevel data={data} sequence={sequence} />;
};

export default Page;
