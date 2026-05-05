import React from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";

export const metadata: Metadata = {
  title: "Privacy Policy | Tuitional",
  description: "Read Tuitional's privacy policy to understand how we collect, use, and protect your personal data when you use our online tutoring services.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
    languages: {
      en: `${SITE_URL}/privacy-policy`,
      "x-default": `${SITE_URL}/privacy-policy`,
    },
  },
  openGraph: {
    title: "Privacy Policy | Tuitional",
    description: "Read Tuitional's privacy policy to understand how we collect, use, and protect your personal data.",
    url: `${SITE_URL}/privacy-policy`,
    locale: "en",
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
