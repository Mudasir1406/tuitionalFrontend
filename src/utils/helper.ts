import { PageData } from "@/types/grade-subject-level.types";
import { SITE_URL_TRUSTPILOT } from "./env";

export const generateSlug = (text: string) => {
  return text
    .replace(/&/g, "and") // Replace & with "and"
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .toLowerCase(); // Convert to lowercase
};

export const subjectsMap: Record<string, string> = {
  Mathematics: "/online/math-tutors",
  "Further Math": "/online/further-maths-tutors",
  "Additional Mathematics": "/online/additional-maths-tutors",
  Physics: "/online/physics-tutors",
  Biology: "/online/biology-tutors",
  Chemistry: "/online/chemistry-tutors",
  "Business Studies": "/online/business-studies-tutors",
  Accounting: "/online/accounting-tutors",
  Economics: "/online/economics-tutors",
  History: "/online/history-tutors",
  Arabic: "/online/arabic-tutors",
  "GCSE Tuition": `/online/gcse-tutors`,
  "IGCSE Tuition": "/online/igcse-tutors",
};

export const findExactSubjectURL = (item: string) => {
  // Find an exact match for the subject name in subjectsMap
  return subjectsMap[item] || "/"; // Default to home if no match is found
};

export function replaceAltText(url: string, newAlt: string) {
  // Create a new URL object from the given URL
  const urlObj = new URL(url);

  // Set the 'alt' parameter to the new alt text
  urlObj.searchParams.set("alt", newAlt);

  // Return the updated URL as a string
  console.log(urlObj.toString());
  return urlObj.toString();
}

export const generateFaqSchema = (faqData?: PageData["Faqs"]) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData?.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return JSON.stringify(schema, null, 2); // Pretty-print JSON for readability
};

export const redirectToTrustpilot = () => {
  window.open(SITE_URL_TRUSTPILOT, "_blank");
};

// export const redirectTo = (route: string) => {
//   window.open(route, "_blank");
// };

export const redirectToExternal = (url: string, newTab: boolean = false) => {
  if (!url || typeof window === "undefined") return;

  if (newTab) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = url;
  }
};

export const getUrl = (item: string) => {
  const queryValue = item
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .replace(/&/g, "and") // Replace "&" with "and"
    .replace(/[^\w-]/g, ""); // Remove any non-word characters except "-" (optional)
  return queryValue;
};

export const scrollToTestimonials = () => {
  const element = document.getElementById("testimonials");
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export const scrollToApplyForm = () => {
  const element = document.getElementById("careersForm");
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export function generateMergedSchema(data: any) {
  // console.log("generateMergedSchema", data);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://tuitionaledu.com/onine/${data?.slugData}/#webpage`,
        url: `https://tuitionaledu.com/onine/${data?.slugData}`,
        name: data?.meta_tags?.title,
        description: data?.meta_tags?.description,
        isPartOf: {
          "@type": "WebPage",
          "@id": "https://tuitionaledu.com/#webpage",
        },
        inLanguage: "en",
        publisher: {
          "@id": "https://tuitionaledu.com/#organization",
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
          email: "hello@tuitionaledu.com",
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
        "@type": "Service",
        "@id": `https://tuitionaledu.com/onine/${data?.slugData}/#service`,
        serviceType: data?.meta_tags?.serviceType,
        provider: {
          "@id": "https://tuitionaledu.com/#organization",
        },
        name: data?.meta_tags?.title,
        description: data?.meta_tags?.description,
        serviceArea: {
          "@type": "Place",
          name: "United Arab Emirates, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman",
        },
        offers: {
          "@type": "Offer",
          eligibleRegion:
            "United Arab Emirates, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman",
        },
      },
      // {
      //   "@type": "FAQPage",
      //   "@id": `${data?.url}#faqpage`,
      //   mainEntity: faqs.map((faq: any) => ({
      //     "@type": "Question",
      //     name: faq.question,
      //     acceptedAnswer: {
      //       "@type": "Answer",
      //       text: faq.answer,
      //     },
      //   })),
      // },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `https://tuitionaledu.com/onine/${data?.slugData}/#faqpage`,
        mainEntity: data?.Faqs?.faqs.map((faq: any) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
        // mainEntity: data?.faqs?.faqs.map((faq?: PageData["Faqs"]) => ({
        //   "@type": "Question",
        //   name: faq.question,
        //   acceptedAnswer: {
        //     "@type": "Answer",
        //     text: faq.answer,
        //   },
        // })),
      },
    ],
  };

  return JSON.stringify(schema, null, 2);
}

export const getSchema = ({
  pageId,
  pageUrl,
  pageName,
  pageDescription,
  email,
}: any) => {
  const organizationSchema = {
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
      email: email,
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
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": pageId,
    url: pageUrl,
    name: pageName,
    description: pageDescription,
    isPartOf: {
      "@id": "https://tuitionaledu.com/#website",
    },
    about: {
      "@id": "https://tuitionaledu.com/#organization",
    },
  };

  const websiteSchema = {
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
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPageSchema, organizationSchema, websiteSchema],
  };
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isNotEmpty = (value: any): boolean =>
  typeof value === "string" && value.trim() !== "";
