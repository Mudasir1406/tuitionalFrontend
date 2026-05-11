import { Header } from "@/components";
import Footer from "@/components/footer-wrapper";
import React, { useState } from "react";

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
            .includes(searchParams.search.toLowerCase()),
      )
    : data;

  return (
    <>
      <div className="bg-gradient-to-b from-[#EDF8FF] via-[#EDF8FF] to-white">
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

        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <SearchBar searchQuery={searchParams?.search || ""} />
          <div className="mt-10">
            <AllBlogs blogs={filteredData} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Page;
