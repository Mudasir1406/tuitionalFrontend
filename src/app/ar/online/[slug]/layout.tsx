import { getPageData } from "@/services/grade-subject-level/grade-subject-level";
import { PageData } from "@/types/grade-subject-level.types";
import { SITE_URL } from "@/utils/env";
import { generateMergedSchema } from "@/utils/helper";
import { Metadata } from "next";
import Script from "next/script";
import React, { ReactNode } from "react";

// Helper function to fetch Arabic page data
const fetchData = async (
  slug: string
): Promise<PageData | undefined | null> => {
  return await getPageData(slug, "ar"); // Pass Arabic locale
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const data: PageData | undefined | null = await fetchData(params.slug);
  if (!data) return {};

  const { title, description, metaName, ogImage, ogTitle, ogDescription } =
    data.meta_tags;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${SITE_URL}/ar/online/${params.slug}`,
    },
    openGraph: {
      images: ogImage,
      title: ogTitle,
      url: `${SITE_URL}/ar/online/${params.slug}`,
      description: ogDescription,
      locale: "ar",
    },
    robots: {
      index: !metaName.includes("noindex"),
      follow: !metaName.includes("nofollow"),
    },
    other: {
      "content-language": "ar",
    },
  };
};

const ArOnlineLayout = async ({
  params,
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) => {
  const data: PageData | undefined | null = await fetchData(params.slug);

  if (!data) return null;

  // Generate Arabic-specific schema markup
  const pageSchema = generateMergedSchema(data);

  return (
    <div lang="ar" dir="rtl">
      <Script
        id="page-schema-ar"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: pageSchema }}
      />
      {children}
    </div>
  );
};

export default ArOnlineLayout;