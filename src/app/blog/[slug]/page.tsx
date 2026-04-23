import BlogSequences from "@/components/blog/blogSequences/blog-sequences";
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
    getBlogData(params.slug, "en"),
    getDocumentsByName("blogs-v1-en"),
    getDocumentsByName("tags"),
    getDocumentsByName("categories"),
  ]);

  if (!data) {
    // If the post doesn't exist in EN, check AR and send the user there.
    const arData = await getBlogData(params.slug, "ar");
    if (arData) return redirect(`/ar/blog/${params.slug}`);
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
    <BlogSequences
      data={sortJsonObjectBySequenceNumber(data) as any}
      allBlogs={allBlogs}
      allTags={allTags?.[0]?.data}
      allCategories={allCategories?.[0]?.data}
    />
  );
};

export default Page;
