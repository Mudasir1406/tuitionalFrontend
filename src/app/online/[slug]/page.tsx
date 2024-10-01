import GradeSubjectLevel from "@/components/grade-subject-level/grade-subject-level";
import {
  getPageData,
  getPageSequence,
} from "@/services/grade-subject-level/grade-subject-level";
import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
import { generateFaqSchema } from "@/utils/helper";
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
      canonical: `https://dev.tuitional.com/gradesubjectlevel/${params.slug}`,
    },
    openGraph: {
      images: data.meta_tags.ogImage,
      title: data.meta_tags.ogTitle,
      url: `https://dev.tuitional.com/gradesubjectlevel/${params.slug}`,
      description: data.meta_tags.ogDescription,
    },
    robots: {
      index: data.meta_tags.metaName.includes("noindex") ? false : true,
      follow: data.meta_tags.metaName.includes("nofollow") ? false : true,
    },
  };
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const data: PageData | undefined = await getPageData(params.slug);
  const sequence: Component_Sequence_Type | undefined = await getPageSequence();
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data?.meta_tags.pageSchemaName,
    description: data?.meta_tags.pageSchemaDescription,
    url: `https://dev.tuitional.com/gradesubjectlevel/${params.slug}`,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: data?.meta_tags.serviceType,
    description: data?.meta_tags.serviceDescription,
    provider: {
      "@type": "Organization",
      name: "Tuitional",
      url: "https://tuitionaledu.com",
    },
  };

  const faqSchema = generateFaqSchema(data?.Faqs);

  if (!data) return redirect("/404");
  if (sequence)
    return (
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchema }}
        />
        <GradeSubjectLevel data={data} sequence={sequence} />
      </div>
    );
};
export default Page;
