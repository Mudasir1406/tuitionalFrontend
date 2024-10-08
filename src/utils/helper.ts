import { PageData } from "@/types/grade-subject-level.types";

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
