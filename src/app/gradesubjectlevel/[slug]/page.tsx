import GradeSubjectLevel from "@/components/grade-subject-level/grade-subject-level";
import {
  getPageData,
  getPageSequence,
} from "@/services/grade-subject-level/grade-subject-level";
import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const data: PageData | undefined = await getPageData(params.slug);
  if (!data) return {};
  return {
    title: data.meta_tags.title,
    description: data.meta_tags.description,
    alternates: {
      canonical: data.meta_tags.canonicalTag,
    },
    openGraph: {
      images: data.meta_tags.ogImage,
      title: data.meta_tags.ogTitle,
      url: data.meta_tags.ogUrl,
      description: data.meta_tags.ogDescription,
    },
    robots: {
      index: data.meta_tags.metaName.includes("noindex") ? false : true, // Dynamically set 'index' or 'noindex'
      follow: data.meta_tags.metaName.includes("nofollow") ? false : true, // Dynamically set 'follow' or 'nofollow'
    },
  };
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const data: PageData | undefined = await getPageData(params.slug);
  const sequence: Component_Sequence_Type | undefined = await getPageSequence();
  console.log(sequence);
  if (!data) return redirect("/404");
  if (sequence)
    return (
      <div>
        <GradeSubjectLevel data={data} sequence={sequence} />
      </div>
    );
};
export default Page;
