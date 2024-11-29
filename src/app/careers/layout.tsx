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
  const careersSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://tuitionaledu.com/careers/#webpage",
        url: "https://tuitionaledu.com/careers",
        name: "Careers at Tuitional",
        description:
          "Join the Tuitional team! Fill out the form and attach your resume to apply for exciting career opportunities in online tutoring and education.",
        isPartOf: {
          "@id": "https://tuitionaledu.com/#website",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://tuitionaledu.com/#organization",
        name: "Tuitional",
        url: "https://tuitionaledu.com/",
        logo: "https://tuitionaledu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e75c8b12.png&w=640&q=75",
        description:
          "Tuitional is a leading online tutoring platform in the Gulf region, providing personalized tutoring services across various curricula including CAIE, Pearson Edexcel, OCR, AQA, IB, SABIS, GED and AP.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          telephone: "+971 56 490 0376",
          email: "careers@tuitionaledu.com",
          areaServed: [
            "United Arab Emirates",
            "Saudi Arabia",
            "Qatar",
            "Kuwait",
            "Bahrain",
            "Oman",
          ],
          availableLanguage: ["English"],
        },
        sameAs: [
          "https://www.trustpilot.com/review/tuitionaledu.com",
          "https://www.facebook.com/tuitionaledu",
          "https://www.instagram.com/tuitionaledu/",
          "https://www.linkedin.com/company/tuitionaledu/",
        ],
        foundingDate: "2022",
        foundingLocation: "Sharjah, UAE",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.4",
          reviewCount: "100",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://tuitionaledu.com/#website",
        url: "https://tuitionaledu.com/",
        name: "Tuitional - Expert Online Tutoring",
        description:
          "Tuitional offers expert online tutoring services for students in the Gulf region following various curricula including CAIE, Edexcel, AQA and more.",
        inLanguage: "en",
        publisher: {
          "@id": "https://tuitionaledu.com/#organization",
        },
      },
    ],
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersSchema) }}
      />

      {children}
    </div>
  );
};

export default Layout;
