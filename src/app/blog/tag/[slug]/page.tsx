import { Header } from "@/components";
import Footer from "@/components/footer";
import React, { useState } from "react";

import styles from "./blog.module.css";
import AllBlogs from "@/components/blog/all-blogs/All-Blogs";
import Hero from "@/components/blog/hero/Hero";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";
import dynamic from "next/dynamic";
import { getDocumentsByName } from "@/services/grade-subject-level/grade-subject-level";
import { AllBlogsData } from "@/types/grade-subject-level.types";

const SearchBar = dynamic(
  () => import("@/components/blog/search-bar/SearchBar"),
  {
    ssr: true,
  }
);

const Page = async ({ searchParams }: { searchParams: { search: string } }) => {
  // Fetch all blogs
  const data = await getDocumentsByName("blogs");

  // Filter data based on search query (if provided)
  const filteredData = searchParams?.search
    ? data.filter(
        (blog: AllBlogsData) =>
          blog?.blogContent?.header
            .toLowerCase()
            .includes(searchParams.search.toLowerCase()) ||
          blog?.blogContent?.header
            .toLowerCase()
            .includes(searchParams.search.toLowerCase())
      )
    : data;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <Hero />
          </div>
          <div className={styles["hero-picture"]}>{/* <HeroInfo /> */}</div>
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
