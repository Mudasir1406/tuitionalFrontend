import { Header } from "@/components";
import Footer from "@/components/footer-wrapper";
import React, { useState } from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Tutoring Blog - Study Tips, Exam Guides & Education News | Tuitional",
  description: "Explore Tuitional's blog for expert study tips, IGCSE & A-Level exam guides, subject breakdowns, and education news for students and parents across the Gulf region.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: {
      en: `${SITE_URL}/blog`,
      "x-default": `${SITE_URL}/blog`,
    },
  },
  openGraph: {
    title: "Tutoring Blog - Study Tips, Exam Guides & Education News | Tuitional",
    description: "Expert study tips, IGCSE & A-Level exam guides, and education news for students and parents across the Gulf region.",
    url: `${SITE_URL}/blog`,
    locale: "en",
    type: "website",
  },
};

import styles from "./blog.module.css";
import AllBlogs from "@/components/blog/all-blogs/All-Blogs";
import Hero from "@/components/blog/hero/Hero";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";
import dynamic from "next/dynamic";
import SearchBar from "@/components/blog/search-bar/SearchBar";
import { getDocumentsByName } from "@/services/grade-subject-level/grade-subject-level";
import { AllBlogsData } from "@/types/grade-subject-level.types";

const Page = async ({ searchParams }: { searchParams: { search: string } }) => {
  // Fetch English blogs
  const data = await getDocumentsByName("blogs-v1-en");

  // Filter data based on search query (if provided)
  const filteredData = searchParams?.search
    ? data.filter(
        (blog: AllBlogsData) =>
          blog?.blogContent?.header
            ?.toLowerCase()
            .includes(searchParams.search.toLowerCase()) ||
          blog?.blogContent?.header
            ?.toLowerCase()
            .includes(searchParams.search.toLowerCase())
      )
    : data;

  return (
    <>
      <BreadcrumbSchema
        id="blog-breadcrumb"
        items={[{ name: "Blog", url: "https://tuitionaledu.com/blog" }]}
      />
      <Header />
      <div className={styles.container}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <Hero />
          </div>
          <div className={styles["hero-picture"]}></div>
        </div>
      </div>

      <div className={styles.verticalMargin}>
        <SchoolLogosSection />
      </div>

      <SearchBar searchQuery={searchParams?.search || ""} />
      <AllBlogs blogs={filteredData} />

      <Footer />
    </>
  );
};
export default Page;
