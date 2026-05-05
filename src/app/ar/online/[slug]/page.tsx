import ArGradeSubjectLevel from "@/components/grade-subject-level/ar-grade-subject-level";
import ArGradeSubjectLevelV2 from "@/components/grade-subject-level/ar-grade-subject-level-v2";
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
  const data = await getPageData(params.slug, "ar");
  if (!data) return {};

  const mt = data.meta_tags ?? {};
  const title = mt.title || data.hero_section?.header || "تدريس خصوصي أونلاين";
  const description = mt.description || data.hero_section?.paragraph || "";
  const canonical = `${SITE_URL}/ar/online/${params.slug}`;
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
      url: canonical,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

interface PageProps {
  params: { slug: string };
}

const ArOnlineSlugPage = async ({ params }: PageProps) => {
  // Fetch Arabic data by passing locale parameter
  const [data, sequence]: [
    PageData | undefined | null,
    Component_Sequence_Type | undefined | null
  ] = await Promise.all([
    getPageData(params.slug, "ar"), // Pass Arabic locale
    getPageSequence(),
  ]);

  // Helper function to sort components by sequence number (for V2 layout)
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

  // Redirect to 404 if no data found
  if (!data) return redirect("/404");

  if (!sequence) {
    return <div>خطأ: لم يتم العثور على ترتيب المكونات.</div>;
  }

  const mt = data.meta_tags ?? {};
  const courseTitle = mt.title || data.hero_section?.header || params.slug;
  const courseDescription = mt.description || data.hero_section?.paragraph || "";
  const courseUrl = `${SITE_URL}/ar/online/${params.slug}`;

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
    inLanguage: ["ar", "en"],
    offers: {
      "@type": "Offer",
      url: courseUrl,
      availability: "https://schema.org/InStock",
    },
  };

  // Use V2 layout if variant is "new", otherwise use V1
  const breadcrumb = (
    <BreadcrumbSchema
      id="ar-online-course-breadcrumb"
      items={[
        { name: "دروس خصوصية أونلاين", url: "https://tuitionaledu.com/ar/online" },
        { name: courseTitle, url: courseUrl },
      ]}
    />
  );

  if (data?.variant === "جديد" || data?.variant === "new") {
    return (
      <>
        <Script
          id="course-schema-ar"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
        {breadcrumb}
        <ArGradeSubjectLevelV2
          data={sortJsonObjectBySequenceNumber(data) as any}
        />
      </>
    );
  }

  return (
    <>
      <Script
        id="course-schema-ar"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {breadcrumb}
      <ArGradeSubjectLevel data={data} sequence={sequence} />
    </>
  );
};

export default ArOnlineSlugPage;
