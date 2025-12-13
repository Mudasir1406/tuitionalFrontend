import React from "react";
import styles from "./blog.module.css";
import ArAllBlogs from "@/components/blog/ar-all-blogs/Ar-All-Blogs";
import ArHero from "@/components/blog/ar-hero/Ar-Hero";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";
import dynamic from "next/dynamic";
import ArSearchBar from "@/components/blog/ar-search-bar/Ar-SearchBar";
import { getDocumentsByName } from "@/services/grade-subject-level/grade-subject-level";
import { AllBlogsData } from "@/types/grade-subject-level.types";
import ArHeader from "@/components/ar-header";
import ArServerFooter from "@/components/ar-server-footer";

const Page = async ({ searchParams }: { searchParams: { search: string } }) => {
  // Fetch Arabic blogs
  const data = await getDocumentsByName("blogs-v1-ar");

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
      <ArHeader />
      <div className={`${styles.container} ${styles.containerRTL}`}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <ArHero />
          </div>
          <div className={styles["hero-picture"]}></div>
        </div>
      </div>

      <div className={styles.verticalMargin}>
        <SchoolLogosSection />
      </div>

      <ArSearchBar searchQuery={searchParams?.search || ""} />
      <ArAllBlogs blogs={filteredData} />

      <ArServerFooter />
    </>
  );
};
export default Page;