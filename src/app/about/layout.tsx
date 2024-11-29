import { getPageData } from "@/services/grade-subject-level/grade-subject-level";
import { PageData } from "@/types/grade-subject-level.types";
import { SITE_URL } from "@/utils/env";
import { generateFaqSchema, getSchema } from "@/utils/helper";
import { Metadata } from "next";
import Script from "next/script";
import React, { ReactNode } from "react";

// Helper function to fetch page data
const fetchData = async (
  slug: string
): Promise<PageData | undefined | null> => {
  return await getPageData(slug);
};

const Layout = async ({
  params,
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) => {
  const schemaData = getSchema({
    pageId: "https://tuitionaledu.com/about/#webpage",
    pageUrl: "https://tuitionaledu.com/about",
    pageName: "About Tuitional",
    pageDescription:
      "Learn more about Tuitional, our mission, vision, and how we help students in the Gulf region achieve academic success through personalized online tutoring.",
  });

  return (
    <div>
      <Script
        id="page-schema"
        type="application/ld+json"
        defer
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {children}
    </div>
  );
};

export default Layout;
