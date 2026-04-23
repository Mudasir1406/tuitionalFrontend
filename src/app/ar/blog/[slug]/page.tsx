import ArBlogSequences from "@/components/blog/ar-blogSequences/ar-blog-sequences";
import {
  getBlogData,
  getDocumentsByName,
} from "@/services/grade-subject-level/grade-subject-level";
import {
  AllBlogsData,
  PageData,
} from "@/types/grade-subject-level.types";
import { notFound, redirect } from "next/navigation";
import React from "react";

export type TagItem = {
  data: { name: { en: string; ar: string }; id: string }[];
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const [data, allBlogs, allTags, allCategories]: [
    PageData | undefined | null,
    AllBlogsData[] | null | undefined,
    TagItem[],
    TagItem[],
  ] = await Promise.all([
    getBlogData(params.slug, "ar"),
    getDocumentsByName("blogs-v1-ar"),
    getDocumentsByName("tags"),
    getDocumentsByName("categories"),
  ]);

  if (!data) {
    // If the post doesn't exist in AR, check EN and send the user there.
    const enData = await getBlogData(params.slug, "en");
    if (enData) return redirect(`/blog/${params.slug}`);
    return notFound();
  }

  const sortJsonObjectBySequenceNumber = (jsonObject: {
    [key: string]: any;
  }): { [key: string]: any } => {
    const entries = Object.entries(jsonObject);
    const sortedEntries = entries.sort(([, valueA], [, valueB]) => {
      const seqA = valueA.sequenceNumber ?? Infinity;
      const seqB = valueB.sequenceNumber ?? Infinity;
      return seqA - seqB;
    });
    return Object.fromEntries(sortedEntries);
  };

  return (
    <ArBlogSequences
      data={sortJsonObjectBySequenceNumber(data) as any}
      allBlogs={allBlogs}
      allTags={allTags?.[0]?.data}
      allCategories={allCategories?.[0]?.data}
    />
  );
};

export default Page;