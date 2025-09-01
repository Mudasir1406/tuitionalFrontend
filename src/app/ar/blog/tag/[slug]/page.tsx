import React from "react";

import styles from "./blog.module.css";
import ArAllBlogs from "@/components/blog/ar-all-blogs/Ar-All-Blogs";
import ArHero from "@/components/blog/ar-hero/Ar-Hero";
import SchoolLogosSection from "@/components/grade-subject-level/school-logos-section/SchoolLogosSection";
import dynamic from "next/dynamic";
import { getDocumentsByName } from "@/services/grade-subject-level/grade-subject-level";
import { AllBlogsData } from "@/types/grade-subject-level.types";
import Breadcrumb from "@/components/bread-crumb/bread-crumb";
import ArHeader from "@/components/ar-header";
import ArServerFooter from "@/components/ar-server-footer";

const ArSearchBar = dynamic(
  () => import("@/components/blog/ar-search-bar/Ar-SearchBar"),
  {
    ssr: true,
  }
);

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  
  // Fetch Arabic blogs and tags
  const [data, tags] = await Promise.all([
    getDocumentsByName("blogs-v1-ar"),
    getDocumentsByName("tags")
  ]);

  // Find the tag
  const tag = tags?.[0]?.data?.find((tagItem: any) => tagItem.id === slug);

  // Filter blogs by tag
  const filteredData = data?.filter((blog: AllBlogsData) =>
    blog?.tag?.data?.some((blogTag: any) => blogTag.id === tag?.id)
  ) || [];

  return (
    <>
      <ArHeader />
      <div className={`${styles.container} ${styles.containerRTL}`}>
        <div className={styles["grid-container"]}>
          <div className={styles["hero"]}>
            <ArHero slug={tag?.name?.ar || "الوسم"} />{" "}
          </div>
          <div className={styles["hero-picture"]}></div>
        </div>
      </div>

      <div className={styles.verticalMargin}>
        <SchoolLogosSection />
      </div>

      {/* <ArSearchBar searchQuery={slug || ""} type={'tag'}/> */}
      <Breadcrumb />

      <ArAllBlogs blogs={filteredData} />

      <ArServerFooter />
    </>
  );
};
export default Page;