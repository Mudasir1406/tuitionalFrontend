import React from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tuitional",
  description: "Read Tuitional's terms and conditions governing the use of our online tutoring platform, including booking, payment, cancellation, and acceptable use policies.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
    languages: {
      en: `${SITE_URL}/terms-and-conditions`,
      "x-default": `${SITE_URL}/terms-and-conditions`,
    },
  },
  openGraph: {
    title: "Terms & Conditions | Tuitional",
    description: "Tuitional's terms and conditions governing the use of our online tutoring platform.",
    url: `${SITE_URL}/terms-and-conditions`,
    locale: "en",
  },
};

export default function TermsAndConditionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
