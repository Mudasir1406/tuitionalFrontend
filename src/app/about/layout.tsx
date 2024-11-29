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
    pageId: "https://tuitionaledu.com/about/#webpage",
    pageUrl: "https://tuitionaledu.com/about",
    pageName: "About Tuitional",
    pageDescription:
      "Learn more about Tuitional, our mission, vision, and how we help students in the Gulf region achieve academic success through personalized online tutoring.",
    email: "hello@tuitionaledu.com",
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
