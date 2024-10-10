import { getPageData } from "@/services/grade-subject-level/grade-subject-level";
import { PageData } from "@/types/grade-subject-level.types";
import { SITE_URL } from "@/utils/env";
import { generateFaqSchema } from "@/utils/helper";
import { Metadata } from "next";
import Script from "next/script";
import React, { ReactNode } from "react";

// Helper function to fetch page data
const fetchData = async (
  slug: string
): Promise<PageData | undefined | null> => {
  return await getPageData(slug);
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
      canonical: `${SITE_URL}/online/${params.slug}`,
    },
    openGraph: {
      images: ogImage,
      title: ogTitle,
      url: `${SITE_URL}/online/${params.slug}`,
      description: ogDescription,
    },
    robots: {
      index: !metaName.includes("noindex"),
      follow: !metaName.includes("nofollow"),
    },
  };
};

const Layout = async ({
  params,
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) => {
  const data: PageData | undefined | null = await fetchData(params.slug);

  if (!data) return null;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.meta_tags.pageSchemaName,
    description: data.meta_tags.pageSchemaDescription,
    url: `${SITE_URL}/online/${params.slug}`,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: data.meta_tags.serviceType,
    description: data.meta_tags.serviceDescription,
    provider: {
      "@type": "Organization",
      name: "Tuitional",
      url: "https://tuitionaledu.com",
    },
  };

  const faqSchema = generateFaqSchema(data.Faqs);

  return (
    <div>
      <Script
        id="page-schema"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      {children}
    </div>
  );
};

export default Layout;
