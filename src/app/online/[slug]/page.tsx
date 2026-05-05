import GradeSubjectLevel from "@/components/grade-subject-level/grade-subject-level";
import GradeSubjectLevelV2 from "@/components/grade-subject-level/grade-subject-level-v2";
import {
  getPageData,
  getPageSequence,
} from "@/services/grade-subject-level/grade-subject-level";
import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
import { SITE_URL } from "@/utils/env";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import Script from "next/script";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getPageData(params.slug);
  if (!data) return {};

  const mt = data.meta_tags ?? {};
  const title = mt.title || data.hero_section?.header || "Online Tutoring";
  const description = mt.description || data.hero_section?.paragraph || "";
  const canonical = mt.canonicalTag || `${SITE_URL}/online/${params.slug}`;
  const ogImage = mt.ogImage || "";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/online/${params.slug}`,
        ar: `${SITE_URL}/ar/online/${params.slug}`,
        "x-default": `${SITE_URL}/online/${params.slug}`,
      },
    },
    openGraph: {
      title: mt.ogTitle || title,
      description: mt.ogDescription || description,
      url: mt.ogUrl || canonical,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const [data, sequence]: [
    PageData | undefined | null,
    Component_Sequence_Type | undefined | null,
  ] = await Promise.all([getPageData(params.slug), getPageSequence()]);

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

  if (!data) return redirect("/404");

  if (!sequence) {
    return <div>Error: Component sequence not found.</div>;
  }

  const mt = data.meta_tags ?? {};
  const courseTitle = mt.title || data.hero_section?.header || params.slug;
  const courseDescription = mt.description || data.hero_section?.paragraph || "";
  const courseUrl = `${SITE_URL}/online/${params.slug}`;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: courseTitle,
    description: courseDescription,
    url: courseUrl,
    provider: {
      "@id": "https://tuitionaledu.com/#organization",
    },
    courseMode: "online",
    inLanguage: ["en", "ar"],
    offers: {
      "@type": "Offer",
      url: courseUrl,
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumb = (
    <BreadcrumbSchema
      id="online-course-breadcrumb"
      items={[
        { name: "Online Tutoring", url: "https://tuitionaledu.com/online" },
        { name: courseTitle, url: courseUrl },
      ]}
    />
  );

  if (data?.variant == "new") {
    return (
      <>
        <Script
          id="course-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
        {breadcrumb}
        <GradeSubjectLevelV2 data={sortJsonObjectBySequenceNumber(data) as any} />
      </>
    );
  }

  return (
    <>
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {breadcrumb}
      <GradeSubjectLevel data={data} sequence={sequence} />
    </>
  );
};

export default Page;
