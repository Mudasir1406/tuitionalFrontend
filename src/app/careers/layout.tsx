import { getSchema } from "@/utils/helper";
import Script from "next/script";
import React, { ReactNode } from "react";

const Layout = async ({
  params,
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) => {
  const schemaData = getSchema({
    pageId: "https://tuitionaledu.com/careers/#webpage",
    pageUrl: "https://tuitionaledu.com/careers",
    pageName: "Careers at Tuitional",
    pageDescription:
      "Join the Tuitional team! Fill out the form and attach your resume to apply for exciting career opportunities in online tutoring and education.",
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
